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
  if (!req.user || req.user.role !== "ADMIN") {
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
      select: { id: true },
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

    const race = await prisma.race.create({
      data: {
        ...validatedData,
        externalRaceId: typeToRaceId(validatedData.type, raceNumber + 1),
      },
    });
    sendSuccess(res, race, "Race created successfully", STATUS.CREATED);
  } catch (error) {
    sendError(res, "Error creating race", {}, STATUS.INTERNAL_SERVER_ERROR);
  }
};

const listRaces = async (req: Request, res: Response) => {
  if (!req.user || req.user.role !== "ADMIN") {
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
export { createRace, listRaces };
