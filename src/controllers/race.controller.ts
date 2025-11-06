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
          ...validatedData,
          raceNumber: raceNumber + 1,
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
    sendError(res, "Error creating race", {}, STATUS.INTERNAL_SERVER_ERROR);
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
    });

    sendSuccess(res, races, "Races retrieved successfully", STATUS.OK);
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
        loftBasketed: true,
        raceBasketed: true,
        raceBasketTime: true,
        eventInventoryItem: {
          select: {
            bird: {
              select: {
                rfId: true,
                band: true,
                color: true,
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
          bird:{
            rfId
          }
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
            bird:{
              rfId
            }
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
};
