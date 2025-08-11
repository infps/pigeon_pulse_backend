import type { Request, Response } from "express";
import { STATUS } from "../utils/statusCodes";
import { sendError, sendSuccess } from "../types/api-response";
import { createOrderSchema } from "../schema/zod";
import validateSchema from "../utils/validators";
import { prisma } from "../lib/prisma";
import { getAccessToken } from "../lib/paypalAccessToken";
import got from "got";
const createEventInventory = async (req: Request, res: Response) => {
  if (!req.user) {
    sendError(res, "Unauthorized", {}, STATUS.UNAUTHORIZED);
    return;
  }
  const validatedData = validateSchema(req, res, "body", createOrderSchema);
  if (!validatedData) return;
  try {
    const doesEventExist = await prisma.event.findUnique({
      where: { id: validatedData.eventId },
      select: {
        id: true,
        feeSchema: {
          select: {
            entryFee: true,
          },
        },
      },
    });
    if (!doesEventExist) {
      sendError(res, "Event not found", {}, STATUS.NOT_FOUND);
      return;
    }
    const breeder = req.user;
    const accessToken = await getAccessToken();
    if (!accessToken) {
      sendError(res, "Internal server error", {}, STATUS.INTERNAL_SERVER_ERROR);
      return;
    }
    const totalAmount = (
      validatedData.birds.length * (doesEventExist.feeSchema?.entryFee ?? 0)
    ).toFixed(2);

    const birds = await prisma.bird.findMany({
      where: {
        id: {
          in: validatedData.birds.map((bird) => bird.birdId),
        },
        breederId: breeder.id,
      },
      select: {
        id: true,
        birdName: true,
      },
    });
    if (birds.length !== validatedData.birds.length) {
      sendError(res, "Some birds not found", {}, STATUS.NOT_FOUND);
      return;
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
              items: birds.map((bird) => ({
                name: bird.birdName,
                unit_amount: {
                  currency_code: "USD",
                  value: (doesEventExist.feeSchema?.entryFee ?? 0).toFixed(2),
                },
                quantity: "1",
              })),
              amount: {
                currency_code: "USD",
                value: totalAmount,
                breakdown: {
                  item_total: {
                    currency_code: "USD",
                    value: totalAmount,
                  },
                },
              },
            },
          ],
          application_context: {
            return_url: `${process.env.FRONTEND_URL}/payment/success`,
            cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`,
          },
        },
      }
    );

    const orderData = JSON.parse(paypalOrder.body);
    await prisma.$transaction(async (tx) => {
      await tx.eventInventoryItem.createMany({
        data: validatedData.birds.map((bird) => ({
          eventId: validatedData.eventId,
          birdId: bird.birdId,
        })),
      });

      const inventory = await tx.eventInventory.create({
        data: {
          loft: "Main Loft",
          reserved_birds: validatedData.birds.length,
          breederId: breeder.id,
          eventId: validatedData.eventId,
        },
      });

      await tx.payment.create({
        data: {
          paymentMethod: "PAYPAL",
          paymentValue: parseFloat(totalAmount),
          transactionId: orderData.id,
          status: "PENDING",
          breederId: breeder.id,
          eventInventoryId: inventory.id,
        },
      });
    });
    sendSuccess(
      res,
      { orderId: orderData.id },
      "Event inventory created successfully",
      STATUS.CREATED
    );
  } catch (error) {
    console.error("Error creating event inventory:", error);
    sendError(
      res,
      "Failed to create event inventory",
      {},
      STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

export { createEventInventory };
