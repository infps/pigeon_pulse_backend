import type { Request, Response } from "express";
import { sendError, sendSuccess } from "../types/api-response";
import { STATUS } from "../utils/statusCodes";
import validateSchema from "../utils/validators";
import { paypalPaymentSchema } from "../schema/zod";
import { getAccessToken } from "../lib/paypalAccessToken";
import got from "got";
import { prisma } from "../lib/prisma";

const capturePayment = async (req: Request, res: Response) => {
  if (!req.user) {
    return sendError(res, "Unauthorized", {}, STATUS.UNAUTHORIZED);
  }

  const validatedData = validateSchema(req, res, "body", paypalPaymentSchema);
  if (!validatedData) return;

  try {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      return sendError(
        res,
        "Failed to fetch PayPal access token",
        {},
        STATUS.INTERNAL_SERVER_ERROR
      );
    }

    const captureResponse = await got.post(
      `${process.env.PAYPAL_API_BASE}/v2/checkout/orders/${validatedData.orderId}/capture`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const captureData = JSON.parse(captureResponse.body);

    const captureInfo =
      captureData.purchase_units?.[0]?.payments?.captures?.[0] || null;

    if (!captureInfo) {
      return sendError(
        res,
        "Invalid PayPal capture response",
        {},
        STATUS.BAD_REQUEST
      );
    }

    const captureId = captureInfo.id;
    const captureStatus = captureInfo.status;

    const paymentRecord = await prisma.payments.findUnique({
      where: { transactionId: validatedData.orderId },
      select: { idEventInventory: true, idPayment: true },
    });

    if (!paymentRecord) {
      return sendError(res, "Payment not found", {}, STATUS.NOT_FOUND);
    }
    if (captureStatus === "COMPLETED") {
      await prisma.$transaction(async (tx) => {
        await tx.payments.update({
          where: { transactionId: validatedData.orderId },
          data: {
            status: 1,
            transactionId: captureId,
          },
        });
      });

      return sendSuccess(
        res,
        { captureId },
        "Payment captured successfully",
        STATUS.OK
      );
    }

    if (captureStatus === "PENDING") {
      await prisma.payments.update({
        where: { transactionId: validatedData.orderId },
        data: {
          status: 2,
          transactionId: captureId,
        },
      });
      return sendSuccess(
        res,
        { captureId },
        "Payment is pending confirmation",
        STATUS.OK
      );
    }

    // await prisma.$transaction(async (tx) => {
    //   await tx.payments.update({
    //     where: { transactionId: validatedData.orderId },
    //     data: { status: 3 },
    //   });

    //   await tx.eventInventory.delete({
    //     where: { idEventInventory: paymentRecord.idEventInventory as number },
    //   });
    // });

    return sendError(res, "Payment failed", {}, STATUS.BAD_REQUEST);
  } catch (error) {
    console.error("Error capturing payment:", error);
    return sendError(
      res,
      "Internal Server Error",
      {},
      STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

const getMyPayments = async (req: Request, res: Response) => {
  if (!req.user) {
    return sendError(res, "Unauthorized", {}, STATUS.UNAUTHORIZED);
  }

  try {
    const breederId = req.user.id;
    const payments = await prisma.payments.findMany({
      where: {
        idBreeder: breederId,
      },
      select: {
        idPayment: true,
        paymentDate: true,
        paymentValue: true,
        status: true,
        paymentType: true,
        eventInventory: {
          select: {
            event: {
              select: {
                idEvent: true,
                eventName: true,
                eventDate: true,
              },
            },
          },
        },
      },
    });

    return sendSuccess(
      res,
      payments,
      "My payments retrieved successfully",
      STATUS.OK
    );
  } catch (error) {
    console.error("Error retrieving my payments:", error);
    return sendError(
      res,
      "Failed to retrieve my payments",
      {},
      STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

const createPaymentOrder = async (req: Request, res: Response) => {
  if (!req.user) {
    return sendError(res, "Unauthorized", {}, STATUS.UNAUTHORIZED);
  }

  const paymentId = req.params.id;
  if (!paymentId) {
    return sendError(res, "Payment ID is required", {}, STATUS.BAD_REQUEST);
  }

  try {
    const payment = await prisma.payments.findUnique({
      where: {
        idPayment: parseInt(paymentId),
        idBreeder: req.user.id,
      },
      select: {
        idPayment: true,
        paymentValue: true,
        status: true,
        paymentType: true,
        eventInventory: {
          select: {
            event: {
              select: {
                eventName: true,
              },
            },
          },
        },
      },
    });

    if (!payment) {
      return sendError(res, "Payment not found", {}, STATUS.NOT_FOUND);
    }

    if (payment.status!=0) {
      return sendError(
        res,
        "Payment is not pending",
        {},
        STATUS.BAD_REQUEST
      );
    }

    const accessToken = await getAccessToken();
    if (!accessToken) {
      return sendError(
        res,
        "Failed to fetch PayPal access token",
        {},
        STATUS.INTERNAL_SERVER_ERROR
      );
    }

    const paypalOrder = await got.post(
      `${process.env.PAYPAL_API_BASE}/v2/checkout/orders`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        json: {
          intent: "CAPTURE",
          purchase_units: [
            {
              items: [
                {
                  name: `${payment.paymentType} - ${payment.eventInventory?.event?.eventName || "Event"}`,
                  unit_amount: {
                    currency_code: "USD",
                    value: payment.paymentValue?.toFixed(2),
                  },
                  quantity: "1",
                },
              ],
              amount: {
                currency_code: "USD",
                value: payment.paymentValue?.toFixed(2),
                breakdown: {
                  item_total: {
                    currency_code: "USD",
                    value: payment.paymentValue?.toFixed(2),
                  },
                },
              },
            },
          ],
          application_context: {
            return_url: `${process.env.BREEDER_DOMAIN}/payment/success`,
            cancel_url: `${process.env.BREEDER_DOMAIN}/payment/cancel`,
          },
        },
      }
    );

    const orderData = JSON.parse(paypalOrder.body);

    // Update payment with the new PayPal order ID
    await prisma.payments.update({
      where: { idPayment: parseInt(paymentId) },
      data: {
        transactionId: orderData.id,
        paymentDate: new Date(),
      },
    });

    return sendSuccess(
      res,
      { orderId: orderData.id },
      "PayPal order created successfully",
      STATUS.CREATED
    );
  } catch (error) {
    console.error("Error creating PayPal order:", error);
    return sendError(
      res,
      "Failed to create PayPal order",
      {},
      STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

const cancelPayment = async (req: Request, res: Response) => {
  if (!req.user) {
    return sendError(res, "Unauthorized", {}, STATUS.UNAUTHORIZED);
  }

  const validatedData = validateSchema(req, res, "body", paypalPaymentSchema);
  if (!validatedData) return;

  try {
    const payment = await prisma.payments.findUnique({
      where: { 
        transactionId: validatedData.orderId,
        idBreeder: req.user.id,
      },
      select: { 
        idEventInventory: true, 
        idPayment: true,
        status: true,
      },
    });

    if (!payment) {
      return sendError(res, "Payment not found", {}, STATUS.NOT_FOUND);
    }

    if (payment.status !== 0) {
      return sendError(
        res,
        "Only pending payments can be cancelled",
        {},
        STATUS.BAD_REQUEST
      );
    }

    await prisma.$transaction(async (tx) => {
      // Delete event inventory items first (due to foreign key constraints)
      await tx.eventInventoryItem.deleteMany({
        where: { idEventInventory: payment.idEventInventory as number },
      });

      // Delete event inventory
      await tx.eventInventory.delete({
        where: { idEventInventory: payment.idEventInventory as number },
      });

      // Delete payment
      await tx.payments.delete({
        where: { idPayment: payment.idPayment },
      });
    });

    return sendSuccess(
      res,
      {},
      "Payment cancelled and registration removed successfully",
      STATUS.OK
    );
  } catch (error) {
    console.error("Error cancelling payment:", error);
    return sendError(
      res,
      "Failed to cancel payment",
      {},
      STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

export { capturePayment, getMyPayments, createPaymentOrder, cancelPayment };
