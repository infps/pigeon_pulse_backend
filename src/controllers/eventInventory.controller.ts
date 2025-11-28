import type { Request, Response } from "express";
import { STATUS } from "../utils/statusCodes";
import { sendError, sendSuccess } from "../types/api-response";
import {
  createOrderSchema,
  idParamsSchema,
  queryParamsSchema,
  updateEventInventoryItemSchema,
} from "../schema/zod";
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
    const doesEventExist = await prisma.events.findUnique({
      where: { idEvent: validatedData.eventId },
      select: {
        idEvent: true,
        feeScheme: {
          select: {
            maxBackupBirdCount: true,
            maxBirdCount: true,
            entryFee: true,
            hotSpot1Fee: true,
            hotSpot2Fee: true,
            hotSpot3Fee: true,
            perchFeeItems: true,
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
    if (
      validatedData.birds.length >
      (doesEventExist.feeScheme?.maxBirdCount as number) +
        (doesEventExist.feeScheme?.maxBackupBirdCount as number)
    ) {
      sendError(
        res,
        "Number of birds exceeds allowed limit",
        {},
        STATUS.BAD_REQUEST
      );
    }

    let totalAmount = 0;
    for (let i = 1; i <= validatedData.birds.length; i++) {
      totalAmount +=
        doesEventExist.feeScheme?.perchFeeItems[i - 1]?.perchFee || 0;
    }

    const birds = await prisma.birds.findMany({
      where: {
        idBird: {
          in: validatedData.birds,
        },
        breederId: breeder.id,
      },
      select: {
        idBird: true,
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
              items: birds.map((bird, index) => ({
                name: bird.birdName,
                unit_amount: {
                  currency_code: "USD",
                  value: (
                    doesEventExist.feeScheme?.perchFeeItems[index]?.perchFee ??
                    0
                  ).toFixed(2),
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
            return_url: `${process.env.BREEDER_DOMAIN}/payment/success`,
            cancel_url: `${process.env.BREEDER_DOMAIN}/payment/cancel`,
          },
        },
      }
    );
    const orderData = JSON.parse(paypalOrder.body);
    await prisma.$transaction(async (tx) => {
      const inventory = await tx.eventInventory.create({
        data: {
          loft: "Main Loft",
          reservedBirds: validatedData.birds.length,
          idBreeder: breeder.id,
          idEvent: validatedData.eventId,
          signInDate: new Date(),
          eventInventoryItems: {
            createMany: {
              data: validatedData.birds.map((bird) => ({
                idBird: bird,
                perchFeeValue: doesEventExist.feeScheme?.perchFeeItems.find(
                  (item, index) => index === validatedData.birds.indexOf(bird)
                )?.perchFee,
                entryFeeValue: doesEventExist.feeScheme?.entryFee,
              })),
            },
          },
        },
      });

      await tx.payments.create({
        data: {
          idBreeder: breeder.id,
          paymentDate: new Date(),
          paymentType: 0,
          paymentMethod: 0,
          paymentValue: totalAmount,
          status:0,
          transactionId: orderData.id,
          paymentTimestamp: new Date(),
          idEventInventory: inventory.idEventInventory,
        },
      });

      // Create due payment entries for other fees
      //   const feeTypes = [
      //     { type: "ENTRY_FEE", amount: doesEventExist.feeScheme?.entryFee },
      //     { type: "HOTSPOT_FEE_1", amount: doesEventExist.feeSchema.hotSpot1Fee },
      //     { type: "HOTSPOT_FEE_2", amount: doesEventExist.feeSchema.hotSpot2Fee },
      //     { type: "HOTSPOT_FEE_3", amount: doesEventExist.feeSchema.hotSpot3Fee },
      //   ];

      //   for (const feeType of feeTypes) {
      //     if (feeType.amount && feeType.amount > 0) {
      //       await tx.payment.create({
      //         data: {
      //           paymentMethod: "BANK_TRANSFER",
      //           type: feeType.type as any,
      //           paymentValue: feeType.amount * validatedData.birds.length,
      //           status: "PENDING",
      //           breederId: breeder.id,
      //           eventInventoryId: inventory.id,
      //         },
      //       });
      //     }
      //   }
      // });
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

const getMYEvents = async (req: Request, res: Response) => {
  if (!req.user) {
    sendError(res, "Unauthorized", {}, STATUS.UNAUTHORIZED);
    return;
  }
  try {
    const breederId = req.user.id;
    const events = await prisma.eventInventory.findMany({
      where: {
        idBreeder: breederId,
      },
      select: {
        event: {
          select: {
            idEvent: true,
            eventName: true,
            eventDate: true,
          },
        },
        reservedBirds: true,
        loft: true,
      },
    });
    sendSuccess(res, events, "My events retrieved successfully", STATUS.OK);
  } catch (error) {
    console.error("Error retrieving my events:", error);
    sendError(
      res,
      "Failed to retrieve my events",
      {},
      STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

const listEventInventory = async (req: Request, res: Response) => {
  if (!req.user) {
    sendError(res, "Unauthorized", {}, STATUS.UNAUTHORIZED);
    return;
  }
  const params = validateSchema(req, res, "params", idParamsSchema);
  if (!params) return;
  const query = validateSchema(req, res, "query", queryParamsSchema);
  if (!query) return;
  try {
    const queryConditions: any = {};
    if (query.q) {
      queryConditions.OR = [
        { breeder: { name: { contains: query.q, mode: "insensitive" } } },
        { breeder: { email: { contains: query.q, mode: "insensitive" } } },
      ];
    }
    queryConditions.idEvent = params.id;
    queryConditions.event = {
      creatorId: req.user.id,
    };
    const inventories = await prisma.eventInventory.findMany({
      where: {
        ...queryConditions,
      },
      include: {
        breeder: true,
        eventInventoryItems: {
          include: {
            bird: true,
          },
        },
        payments: true,
      },
    });
    sendSuccess(
      res,
      inventories,
      "Event inventories retrieved successfully",
      STATUS.OK
    );
  } catch (error) {
    console.error("Error retrieving event inventories:", error);
    sendError(
      res,
      "Failed to retrieve event inventories",
      {},
      STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

const getEventInventoryDetails = async (req: Request, res: Response) => {
  if (!req.user) {
    sendError(res, "Unauthorized", {}, STATUS.UNAUTHORIZED);
    return;
  }
  const params = validateSchema(req, res, "params", idParamsSchema);
  if (!params) return;

  try {
    const eventInventory = await prisma.eventInventory.findUnique({
      where: { idEventInventory: params.id },
      select: {
        breeder: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        event: {
          select: {
            eventName: true,
            eventDate: true,
          },
        },
        payments: true,
        eventInventoryItems: {
          include: {
            bird: {
              include: {
                breeder: {
                  select: {
                    idBreeder: true,
                    firstName: true,
                    lastName: true,
                  },
                },
              },
            },
          },
        },
        reservedBirds: true,
        loft: true,
      },
    });
    if (!eventInventory) {
      sendError(res, "Event inventory not found", {}, STATUS.NOT_FOUND);
      return;
    }
    sendSuccess(
      res,
      eventInventory,
      "Event inventory retrieved successfully",
      STATUS.OK
    );
  } catch (error) {
    console.error("Error retrieving event inventory:", error);
    sendError(
      res,
      "Failed to retrieve event inventory",
      {},
      STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

const updateEventInventoryItem = async (req: Request, res: Response) => {
  if (!req.user) {
    sendError(res, "Unauthorized", {}, STATUS.UNAUTHORIZED);
    return;
  }

  const params = validateSchema(req, res, "params", idParamsSchema);
  if (!params) return;
  const validatedData = validateSchema(
    req,
    res,
    "body",
    updateEventInventoryItemSchema
  );
  if (!validatedData) return;

  try {
    const eventInventoryItem = await prisma.eventInventoryItem.findUnique({
      where: { idEventInventoryItem: params.id },
      select: { idEventInventory: true },
    });
    if (!eventInventoryItem) {
      sendError(res, "Event inventory item not found", {}, STATUS.NOT_FOUND);
      return;
    }

    const updatedItem = await prisma.eventInventoryItem.update({
      where: { idEventInventoryItem: params.id },
      data: {
        arrivalTime: validatedData.arrivalDate,
        departureDate: validatedData.departureDate,

        bird: {
          update: {
            note: validatedData.note,
            sex: validatedData.sex,
            color: validatedData.color,
            birdName: validatedData.birdName,
            isLost: validatedData.is_lost,
            lostDate: validatedData.lost_date,
            isActive: validatedData.is_active,
            band1: validatedData.band_1,
            band2: validatedData.band_2,
            band3: validatedData.band_3,
            band4: validatedData.band_4,
            band: `${validatedData.band_1}-${validatedData.band_2}-${validatedData.band_3}-${validatedData.band_4}`,
          },
        },
      },
    });
    sendSuccess(
      res,
      updatedItem,
      "Event inventory item updated successfully",
      STATUS.OK
    );
  } catch (error) {
    console.error("Error updating event inventory item:", error);
    sendError(
      res,
      "Failed to update event inventory item",
      {},
      STATUS.INTERNAL_SERVER_ERROR
    );
  }
};
export {
  createEventInventory,
  getMYEvents,
  listEventInventory,
  updateEventInventoryItem,
  getEventInventoryDetails,
};
