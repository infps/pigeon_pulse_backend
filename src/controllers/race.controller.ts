import type { Request, Response } from "express";
import { sendError, sendSuccess } from "../types/api-response";
import { STATUS } from "../utils/statusCodes";
import validateSchema from "../utils/validators";
import { createRaceSchema, idParamsSchema } from "../schema/zod";
import { prisma } from "../lib/prisma";

function typeToRaceId(type: string, number: number): string {
  switch (type) {
    case "TRAINING":
      return `T-${number}`;
    case "INVENTORY":
      return `I-${number}`;
    case "LOFT_FLY":
      return `LF-${number}`;
    case "PULLING_FLIGHT":
      return `PF-${number}`;
    case "FINAL_RACE":
      return `FR-${number}`;
    case "HOTSPOT_1":
      return `HS1-${number}`;
    case "HOTSPOT_2":
      return `HS2-${number}`;
    case "HOTSPOT_3":
      return `HS3-${number}`;
    case "AVG_WINNER":
      return `AW-${number}`;
    default:
      return `UNKNOWN-${number}`;
  }
}

const createRace = async (req: Request, res: Response) => {
  if (!req.user) {
    sendError(res, "Unauthorized access", {}, STATUS.UNAUTHORIZED);
    return;
  }
  const validatedData = validateSchema(req, res, "body", createRaceSchema);
  if (!validatedData) return;

  try {
    const event = await prisma.event.findUnique({
      where: {
        id: validatedData.eventId,
      },
      select: {
        id: true,
        eventInventoryItems: {
          select: { id: true },
        },
      },
    });
    if (!event) {
      sendError(res, "Event not found", {}, STATUS.NOT_FOUND);
      return;
    }
    const raceNumber = await prisma.race.count({
      where: {
        eventId: validatedData.eventId,
        type: validatedData.type,
      },
    });

    const race = await prisma.$transaction(async (tx) => {
      const race = await tx.race.create({
        data: {
          distance: validatedData.distance,
          startTime: validatedData.startTime,
          type: validatedData.type,
          eventId: validatedData.eventId,
          location: validatedData.location,
          raceNumber: raceNumber + 1,
          description: validatedData.description,
          arrivalTemperature: validatedData.arrivalTemperature,
          arrivalWeather: validatedData.arrivalWeather,
          arrivalWind: validatedData.arrivalWind,
          endTime: validatedData.endTime,
          sunset: validatedData.sunset,
          sunrise: validatedData.sunrise,
          temperature: validatedData.temperature,
          weather: validatedData.weather,
          wind: validatedData.wind,
        },
      });

      await tx.raceItem.createMany({
        data: event.eventInventoryItems.map((item) => ({
          eventInventoryItemId: item.id,
          raceId: race.id,
        })),
      });

      return race;
    });

    sendSuccess(res, race, "Race created successfully", STATUS.CREATED);
  } catch (error) {
    console.error("Error creating race:", error);
    sendError(res, "Error creating race", {}, STATUS.INTERNAL_SERVER_ERROR);
  }
};

const updateRace = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      sendError(res, "Unauthorized access", {}, STATUS.UNAUTHORIZED);
      return;
    }
    const params = validateSchema(req, res, "params", idParamsSchema);
    if (!params) return;

    const validatedData = validateSchema(req, res, "body", createRaceSchema);
    if (!validatedData) return;

    const race = await prisma.race.findUnique({
      where: { id: params.id },
    });
    if (!race) {
      sendError(res, "Race not found", {}, STATUS.NOT_FOUND);
      return;
    }
    const updatedRace = await prisma.race.update({
      where: { id: params.id },
      data: {
        distance: validatedData.distance,
        startTime: validatedData.startTime,
        type: validatedData.type,
        eventId: validatedData.eventId,
        location: validatedData.location,
        description: validatedData.description,
        arrivalTemperature: validatedData.arrivalTemperature,
        arrivalWeather: validatedData.arrivalWeather,
        arrivalWind: validatedData.arrivalWind,
        endTime: validatedData.endTime,
        sunset: validatedData.sunset,
        sunrise: validatedData.sunrise,
        temperature: validatedData.temperature,
        weather: validatedData.weather,
        wind: validatedData.wind,
      },
    });
    sendSuccess(res, updatedRace, "Race updated successfully", STATUS.OK);
  } catch (error) {
    console.error("Error updating race:", error);
    sendError(res, "Error updating race", {}, STATUS.INTERNAL_SERVER_ERROR);
  }
};

const listRaces = async (req: Request, res: Response) => {
  if (!req.user) {
    sendError(res, "Unauthorized access", {}, STATUS.UNAUTHORIZED);
    return;
  }
  const params = validateSchema(req, res, "params", idParamsSchema);
  if (!params) return;

  try {
    const races = await prisma.race.findMany({
      where: {
        eventId: params.id,
      },
      include: {
        _count: {
          select: {
            raceItems: true,
          },
        },
      },
    });

    // Calculate statistics for each race
    const racesWithStats = await Promise.all(
      races.map(async (race) => {
        const stats = await prisma.raceItem.groupBy({
          by: ['isLost'],
          where: {
            raceId: race.id,
          },
          _count: {
            _all: true,
          },
        });

        const basketedCount = await prisma.raceItem.count({
          where: {
            raceId: race.id,
            raceBasketed: true,
          },
        });

        const arrivedCount = await prisma.raceItemResult.count({
          where: {
            raceItem: {
              raceId: race.id,
            },
          },
        });

        const totalBirds = race._count.raceItems;
        const lostCount = stats.find(s => s.isLost)?._count._all || 0;
        const notArrived = totalBirds - arrivedCount - lostCount;

        return {
          ...race,
          stats: {
            totalBirds,
            basketed: basketedCount,
            arrived: arrivedCount,
            notArrived,
            lost: lostCount,
          },
        };
      })
    );

    sendSuccess(res, racesWithStats, "Races retrieved successfully", STATUS.OK);
  } catch (error) {
    console.error("Error retrieving races:", error);
    sendError(res, "Error retrieving races", {}, STATUS.INTERNAL_SERVER_ERROR);
  }
};

const listRace = async (req: Request, res: Response) => {
  if (!req.user) {
    sendError(res, "Unauthorized access", {}, STATUS.UNAUTHORIZED);
    return;
  }
  const params = validateSchema(req, res, "params", idParamsSchema);
  if (!params) return;

  try {
    const race = await prisma.race.findUnique({
      where: {
        id: params.id,
      },
    });
    if (!race) {
      sendError(res, "Race not found", {}, STATUS.NOT_FOUND);
      return;
    }
    sendSuccess(res, race, "Race retrieved successfully", STATUS.OK);
  } catch (error) {
    console.error("Error retrieving race:", error);
    sendError(res, "Error retrieving race", {}, STATUS.INTERNAL_SERVER_ERROR);
  }
};

const listRaceItems = async (req: Request, res: Response) => {
  if (!req.user) {
    sendError(res, "Unauthorized access", {}, STATUS.UNAUTHORIZED);
    return;
  }
  const params = validateSchema(req, res, "params", idParamsSchema);
  if (!params) return;

  try {
    const raceItems = await prisma.raceItem.findMany({
      where: {
        raceId: params.id,
      },
      select: {
        id: true,
        loftBasketed: true,
        raceBasketed: true,
        raceBasketTime: true,
        isLost: true,
        loftBasket: {
          select: {
            id: true,
            basketNumber: true,
          },
        },
        raceBasket: {
          select: {
            id: true,
            basketNumber: true,
          },
        },
        eventInventoryItem: {
          select: {
            bird: {
              select: {
                rfId: true,
                band: true,
                color: true,
                birdName: true,
                isLost: true,
                breeder: {
                  select: {
                    firstName: true,
                    lastName: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    sendSuccess(res, raceItems, "Race items retrieved successfully", STATUS.OK);
  } catch (error) {
    console.error("Error retrieving race items:", error);
    sendError(
      res,
      "Error retrieving race items",
      {},
      STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

const listBaskets = async (req: Request, res: Response) => {
  if (!req.user) {
    sendError(res, "Unauthorized access", {}, STATUS.UNAUTHORIZED);
    return;
  }
  const params = validateSchema(req, res, "params", idParamsSchema);
  if (!params) return;

  try {
    const baskets = await prisma.basket.findMany({
      where: { raceId: params.id },
      orderBy: { basketNumber: "asc" },
      include: {
        _count: {
          select: {
            raceBasketItems: true,
            loftBasketItems: true,
          },
        },
      },
    });
    sendSuccess(res, baskets, "Baskets retrieved successfully", STATUS.OK);
  } catch (error) {
    console.error("Error retrieving baskets:", error);
    sendError(
      res,
      "Error retrieving baskets",
      {},
      STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

const createBasket = async (req: Request, res: Response) => {
  if (!req.user) {
    sendError(res, "Unauthorized access", {}, STATUS.UNAUTHORIZED);
    return;
  }
  const params = validateSchema(req, res, "params", idParamsSchema);
  if (!params) return;
  const { capacity, isRaceBasket, basketNumber } = req.body as {
    capacity?: number;
    isRaceBasket?: boolean;
    basketNumber?: number;
  };

  if (typeof capacity !== "number" || capacity <= 0) {
    sendError(
      res,
      "capacity must be a positive number",
      {},
      STATUS.BAD_REQUEST
    );
    return;
  }

  try {
    let numberToUse = basketNumber;
    if (!numberToUse) {
      const count = await prisma.basket.count({
        where: { raceId: params.id, isRaceBasket: !!isRaceBasket },
      });
      numberToUse = count + 1;
    }
    const basket = await prisma.basket.create({
      data: {
        raceId: params.id,
        capacity,
        isRaceBasket: !!isRaceBasket,
        basketNumber: numberToUse!,
      },
    });
    sendSuccess(res, basket, "Basket created successfully", STATUS.CREATED);
  } catch (error) {
    console.error("Error creating basket:", error);
    sendError(res, "Error creating basket", {}, STATUS.INTERNAL_SERVER_ERROR);
  }
};

const updateBasket = async (req: Request, res: Response) => {
  if (!req.user) {
    sendError(res, "Unauthorized access", {}, STATUS.UNAUTHORIZED);
    return;
  }
  const params = validateSchema(req, res, "params", idParamsSchema);
  if (!params) return;
  const basketId = req.params.basketId;
  
  if (!basketId) {
    sendError(res, "basketId is required", {}, STATUS.BAD_REQUEST);
    return;
  }

  const { capacity, basketNumber } = req.body as {
    capacity?: number;
    basketNumber?: number;
  };

  if (capacity !== undefined && (typeof capacity !== "number" || capacity <= 0)) {
    sendError(
      res,
      "capacity must be a positive number",
      {},
      STATUS.BAD_REQUEST
    );
    return;
  }

  if (basketNumber !== undefined && (typeof basketNumber !== "number" || basketNumber <= 0)) {
    sendError(
      res,
      "basketNumber must be a positive number",
      {},
      STATUS.BAD_REQUEST
    );
    return;
  }

  try {
    const basket = await prisma.basket.findUnique({
      where: { id: basketId },
    });

    if (!basket || basket.raceId !== params.id) {
      sendError(res, "Basket not found for race", {}, STATUS.NOT_FOUND);
      return;
    }

    const updateData: { capacity?: number; basketNumber?: number } = {};
    if (capacity !== undefined) updateData.capacity = capacity;
    if (basketNumber !== undefined) updateData.basketNumber = basketNumber;

    const updatedBasket = await prisma.basket.update({
      where: { id: basketId },
      data: updateData,
    });

    sendSuccess(res, updatedBasket, "Basket updated successfully", STATUS.OK);
  } catch (error) {
    console.error("Error updating basket:", error);
    sendError(res, "Error updating basket", {}, STATUS.INTERNAL_SERVER_ERROR);
  }
};

const deleteBasket = async (req: Request, res: Response) => {
  if (!req.user) {
    sendError(res, "Unauthorized access", {}, STATUS.UNAUTHORIZED);
    return;
  }
  const params = validateSchema(req, res, "params", idParamsSchema);
  if (!params) return;
  const basketId = req.params.basketId;

  if (!basketId) {
    sendError(res, "basketId is required", {}, STATUS.BAD_REQUEST);
    return;
  }

  try {
    const basket = await prisma.basket.findUnique({
      where: { id: basketId },
      include: {
        _count: {
          select: {
            raceBasketItems: true,
            loftBasketItems: true,
          },
        },
      },
    });

    if (!basket || basket.raceId !== params.id) {
      sendError(res, "Basket not found for race", {}, STATUS.NOT_FOUND);
      return;
    }

    const totalItems = basket._count.raceBasketItems + basket._count.loftBasketItems;
    if (totalItems > 0) {
      sendError(
        res,
        "Cannot delete basket with assigned items. Please remove all items first.",
        {},
        STATUS.BAD_REQUEST
      );
      return;
    }

    await prisma.basket.delete({
      where: { id: basketId },
    });

    sendSuccess(res, { id: basketId }, "Basket deleted successfully", STATUS.OK);
  } catch (error) {
    console.error("Error deleting basket:", error);
    sendError(res, "Error deleting basket", {}, STATUS.INTERNAL_SERVER_ERROR);
  }
};

const updateRaceItem = async (req: Request, res: Response) => {
  if (!req.user) {
    sendError(res, "Unauthorized access", {}, STATUS.UNAUTHORIZED);
    return;
  }
  const params = validateSchema(req, res, "params", idParamsSchema);
  if (!params) return;
  const raceItemId = req.params.raceItemId;

  if (!raceItemId) {
    sendError(res, "raceItemId is required", {}, STATUS.BAD_REQUEST);
    return;
  }

  const { loftBasketId, raceBasketId, loftBasketed } = req.body as {
    loftBasketId?: string | null;
    raceBasketId?: string | null;
    loftBasketed?: boolean;
  };

  try {
    const raceItem = await prisma.raceItem.findUnique({
      where: { id: raceItemId },
    });

    if (!raceItem || raceItem.raceId !== params.id) {
      sendError(res, "Race item not found for race", {}, STATUS.NOT_FOUND);
      return;
    }

    // Validate baskets belong to the race
    if (loftBasketId) {
      const basket = await prisma.basket.findUnique({
        where: { id: loftBasketId },
      });
      if (!basket || basket.raceId !== params.id || basket.isRaceBasket) {
        sendError(
          res,
          "Invalid loft basket for this race",
          {},
          STATUS.BAD_REQUEST
        );
        return;
      }
    }

    if (raceBasketId) {
      const basket = await prisma.basket.findUnique({
        where: { id: raceBasketId },
      });
      if (!basket || basket.raceId !== params.id || !basket.isRaceBasket) {
        sendError(
          res,
          "Invalid race basket for this race",
          {},
          STATUS.BAD_REQUEST
        );
        return;
      }
    }

    const updateData: {
      loftBasketId?: string | null;
      loftBasketed?: boolean;
      raceBasketId?: string | null;
      raceBasketed?: boolean;
      raceBasketTime?: Date | null;
    } = {};

    if (loftBasketId !== undefined) {
      updateData.loftBasketId = loftBasketId;
      updateData.loftBasketed = loftBasketed ?? !!loftBasketId;
    }

    if (raceBasketId !== undefined) {
      updateData.raceBasketId = raceBasketId;
      updateData.raceBasketed = !!raceBasketId;
      updateData.raceBasketTime = raceBasketId ? new Date() : null;
    }

    const updatedRaceItem = await prisma.raceItem.update({
      where: { id: raceItemId },
      data: updateData,
      include: {
        loftBasket: {
          select: {
            id: true,
            basketNumber: true,
          },
        },
        raceBasket: {
          select: {
            id: true,
            basketNumber: true,
          },
        },
        eventInventoryItem: {
          include: {
            bird: {
              include: {
                breeder: {
                  select: {
                    firstName: true,
                    lastName: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    sendSuccess(res, updatedRaceItem, "Race item updated successfully", STATUS.OK);
  } catch (error) {
    console.error("Error updating race item:", error);
    sendError(res, "Error updating race item", {}, STATUS.INTERNAL_SERVER_ERROR);
  }
};

const assignToBasket = async (req: Request, res: Response) => {
  if (!req.user) {
    sendError(res, "Unauthorized access", {}, STATUS.UNAUTHORIZED);
    return;
  }
  const params = validateSchema(req, res, "params", idParamsSchema);
  if (!params) return;
  const basketId = req.params.basketId;
  const { rfId } = req.body as { rfId?: string };
  if (!basketId || !rfId) {
    sendError(res, "basketId and rfId are required", {}, STATUS.BAD_REQUEST);
    return;
  }

  try {
    const basket = await prisma.basket.findUnique({
      where: { id: basketId },
    });
    if (!basket || basket.raceId !== params.id) {
      sendError(res, "Basket not found for race", {}, STATUS.NOT_FOUND);
      return;
    }

    const raceItem = await prisma.raceItem.findFirst({
      where: {
        raceId: params.id,
        eventInventoryItem: { bird: { rfId } },
      },
    });
    if (!raceItem) {
      sendError(res, "Race item not found", {}, STATUS.NOT_FOUND);
      return;
    }

    // Count current occupancy
    const occupancy = await prisma.raceItem.count({
      where: basket.isRaceBasket
        ? { raceBasketId: basket.id }
        : { loftBasketId: basket.id },
    });
    if (occupancy >= basket.capacity) {
      sendError(res, "Basket is full", {}, STATUS.BAD_REQUEST);
      return;
    }

    const updated = await prisma.raceItem.update({
      where: { id: raceItem.id },
      data: basket.isRaceBasket
        ? {
            raceBasketId: basket.id,
            raceBasketed: true,
            raceBasketTime: new Date(),
          }
        : {
            loftBasketId: basket.id,
            loftBasketed: true,
          },
    });

    sendSuccess(res, updated, "Assigned to basket", STATUS.OK);
  } catch (error) {
    console.error("Error assigning to basket:", error);
    sendError(
      res,
      "Error assigning to basket",
      {},
      STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

const raceItemLoftBasket = async (req: Request, res: Response) => {
  if (!req.user) {
    sendError(res, "Unauthorized access", {}, STATUS.UNAUTHORIZED);
    return;
  }
  const params = validateSchema(req, res, "params", idParamsSchema);
  if (!params) return;
  const { rfId } = req.body;
  if (!rfId) {
    sendError(res, "RFID is required", {}, STATUS.BAD_REQUEST);
    return;
  }

  try {
    const raceItem = await prisma.raceItem.findFirst({
      where: {
        eventInventoryItem: {
          bird: {
            rfId,
          },
        },
        raceId: params.id,
      },
    });

    if (!raceItem) {
      sendError(res, "Race item not found", {}, STATUS.NOT_FOUND);
      return;
    }
    const updatedRaceItem = await prisma.raceItem.update({
      where: {
        id: raceItem.id,
      },
      data: {
        loftBasketed: true,
      },
    });
    sendSuccess(
      res,
      updatedRaceItem,
      "Race item updated successfully",
      STATUS.OK
    );
  } catch (error) {
    console.error("Error retrieving race item:", error);
    sendError(
      res,
      "Error retrieving race item",
      {},
      STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

const raceItemRaceBasket = async (req: Request, res: Response) => {
  if (!req.user) {
    sendError(res, "Unauthorized access", {}, STATUS.UNAUTHORIZED);
    return;
  }
  const params = validateSchema(req, res, "params", idParamsSchema);
  if (!params) return;
  const { rfId } = req.body;
  if (!rfId) {
    sendError(res, "RFID is required", {}, STATUS.BAD_REQUEST);
    return;
  }

  try {
    const raceItem = await prisma.raceItem.findFirst({
      where: {
        eventInventoryItem: {
          bird: {
            rfId,
          },
        },
        raceId: params.id,
      },
    });

    if (!raceItem) {
      sendError(res, "Race item not found", {}, STATUS.NOT_FOUND);
      return;
    }

    const updatedRaceItem = await prisma.raceItem.update({
      where: {
        id: raceItem.id,
      },
      data: {
        raceBasketed: true,
        raceBasketTime: new Date(),
      },
    });

    sendSuccess(
      res,
      updatedRaceItem,
      "Race item updated successfully",
      STATUS.OK
    );
  } catch (error) {
    console.error("Error retrieving race item:", error);
    sendError(
      res,
      "Error retrieving race item",
      {},
      STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

const listRaceResults = async (req: Request, res: Response) => {
  if (!req.user) {
    sendError(res, "Unauthorized access", {}, STATUS.UNAUTHORIZED);
    return;
  }
  const params = validateSchema(req, res, "params", idParamsSchema);
  if (!params) return;

  try {
    const raceResults = await prisma.raceItem.findMany({
      where: {
        raceId: params.id,
      },
      select: {
        raceItemResult: true,
        eventInventoryItem: {
          select: {
            bird: {
              select: {
                band: true,
                rfId: true,
                color: true,
                birdName: true,
                breeder: {
                  select: {
                    firstName: true,
                    lastName: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        raceItemResult: {
          arrivalTime: "asc",
        },
      },
    });
    sendSuccess(
      res,
      raceResults,
      "Race results retrieved successfully",
      STATUS.OK
    );
  } catch (error) {
    console.error("Error retrieving race results:", error);
    sendError(
      res,
      "Error retrieving race results",
      {},
      STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

const publishRaceResults = async (req: Request, res: Response) => {
  if (!req.user) {
    sendError(res, "Unauthorized access", {}, STATUS.UNAUTHORIZED);
    return;
  }
  const params = validateSchema(req, res, "params", idParamsSchema);
  if (!params) return;
  const { rfId } = req.body;
  try {
    const raceItem = await prisma.raceItem.findFirst({
      where: {
        eventInventoryItem: {
          bird: {
            rfId,
          },
        },
        raceId: params.id,
      },
      select: {
        race: {
          select: {
            distance: true,
            startTime: true,
          },
        },
        id: true,
      },
    });

    if (!raceItem) {
      sendError(res, "Race item not found", {}, STATUS.NOT_FOUND);
      return;
    }

    const elapsedHours =
      (Date.now() - raceItem.race.startTime.getTime()) / (1000 * 60 * 60);

    const updatedRaceResult = await prisma.raceItemResult.upsert({
      where: {
        raceItemId: raceItem.id,
        raceItem: {
          eventInventoryItem: {
            bird: {
              rfId,
            },
          },
        },
      },
      create: {
        raceItemId: raceItem.id,
        arrivalTime: new Date(),
        // speed: raceItem.race.distance / elapsedHours,
      },
      update: {
        arrivalTime: new Date(),
        // distance: raceItem.race.distance,
        // speed: raceItem.race.distance / elapsedHours,
      },
    });
    sendSuccess(
      res,
      updatedRaceResult,
      "Race result published successfully",
      STATUS.OK
    );
  } catch (error) {
    console.error("Error publishing race result:", error);
    sendError(
      res,
      "Error publishing race result",
      {},
      STATUS.INTERNAL_SERVER_ERROR
    );
  }
};
export {
  createRace,
  listRaces,
  listRace,
  listRaceItems,
  raceItemLoftBasket,
  raceItemRaceBasket,
  listRaceResults,
  publishRaceResults,
  listBaskets,
  createBasket,
  updateBasket,
  deleteBasket,
  updateRaceItem,
  assignToBasket,
  updateRace
};
