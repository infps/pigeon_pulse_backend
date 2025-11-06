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

    const paymentRecord = await prisma.payment.findUnique({
      where: { transactionId: validatedData.orderId },
      select: { eventInventoryId: true, id: true },
    });

    if (!paymentRecord) {
      return sendError(res, "Payment not found", {}, STATUS.NOT_FOUND);
    }
    if (captureStatus === "COMPLETED") {
      await prisma.$transaction(async (tx) => {
        await tx.payment.update({
          where: { transactionId: validatedData.orderId },
          data: {
            status: "COMPLETED",
            transactionId: captureId,
          },
        });

        await tx.eventInventory.update({
          where: { id: paymentRecord.eventInventoryId },
          data: {  },
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
      await prisma.payment.update({
        where: { transactionId: validatedData.orderId },
        data: {
          status: "PENDING",
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

    await prisma.$transaction(async (tx) => {
      await tx.payment.update({
        where: { transactionId: validatedData.orderId },
        data: { status: "FAILED" },
      });

      await tx.eventInventory.delete({
        where: { id: paymentRecord.eventInventoryId },
      });
    });

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
    const payments = await prisma.payment.findMany({
      where: {
        breederId: breederId,
      },
      select: {
        id: true,
        paymentDate: true,
        paymentValue: true,
        status: true,
        type: true,
        eventInventory: {
          select: {
            event: {
              select: {
                id: true,
                name: true,
                date: true,
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

export { capturePayment, getMyPayments };
