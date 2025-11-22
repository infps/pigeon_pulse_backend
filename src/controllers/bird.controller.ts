import type { Request, Response } from "express";
import { sendError, sendSuccess } from "../types/api-response";
import { STATUS } from "../utils/statusCodes";
import { prisma } from "../lib/prisma";
import validateSchema from "../utils/validators";
import {
  addBirdSchema,
  idParamsSchema,
  listBirdQuery,
  updateBirdSchema,
} from "../schema/zod";
const getMyBirds = async (req: Request, res: Response) => {
  if (!req.user) {
    sendError(res, "Unauthorized", {}, STATUS.UNAUTHORIZED);
    return;
  }
  try {
    const birds = await prisma.birds.findMany({
      where: {
        breederId: req.user.id,
      },
      select: {
        birdName: true,
        color: true,
        sex: true,
        idBird: true,
      },
    });
    sendSuccess(res, birds, "Birds fetched successfully", STATUS.OK);
    return;
  } catch (error) {
    console.error("Error fetching birds:", error);
    sendError(res, "Failed to fetch birds", {}, STATUS.INTERNAL_SERVER_ERROR);
  }
};

const updateBird = async (req: Request, res: Response) => {
  if (!req.user) {
    sendError(res, "Unauthorized", {}, STATUS.UNAUTHORIZED);
    return;
  }
  const params = validateSchema(req, res, "params", idParamsSchema);
  if (!params) return;
  const validatedData = validateSchema(req, res, "body", updateBirdSchema);
  if (!validatedData) return;

  try {
    const bird = await prisma.birds.findUnique({
      where: {
        idBird: params.id,
      },
    });
    if (!bird) {
      sendError(res, "Bird not found", {}, STATUS.NOT_FOUND);
      return;
    }

    const updatedBird = await prisma.birds.update({
      where: {
        idBird: params.id,
      },
      data: {
        birdName: validatedData.birdName,
        color: validatedData.color,
        sex: validatedData.sex,
      },
    });
    sendSuccess(res, updatedBird, "Bird updated successfully", STATUS.OK);
    return;
  } catch (error) {
    console.error("Error updating bird:", error);
    sendError(res, "Failed to update bird", {}, STATUS.INTERNAL_SERVER_ERROR);
  }
};

const addBird = async (req: Request, res: Response) => {
  if (!req.user) {
    sendError(res, "Unauthorized", {}, STATUS.UNAUTHORIZED);
    return;
  }
  const validatedData = validateSchema(req, res, "body", addBirdSchema);
  if (!validatedData) return;
  try {
    const bird = await prisma.birds.create({
      data: {
        breederId: req.user.id,
        ...validatedData,
      },
    });
    sendSuccess(res, bird, "Bird added successfully", STATUS.CREATED);
    return;
  } catch (error) {
    console.error("Error adding bird:", error);
    sendError(res, "Failed to add bird", {}, STATUS.INTERNAL_SERVER_ERROR);
  }
};

const getBirdsPerEvent = async (req: Request, res: Response) => {
  if (!req.user) {
    sendError(res, "Unauthorized", {}, STATUS.UNAUTHORIZED);
    return;
  }
  const params = validateSchema(req, res, "params", idParamsSchema);
  if (!params) return;

  const query = validateSchema(req, res, "query", listBirdQuery);
  if (!query) return;

  try {
    const birds = await prisma.eventInventory.findMany({
      where: {
        idEvent: params.id,
        eventInventoryItems: {
          some: {
            bird: {
              birdName: {
                contains: query.q || undefined,
                mode: "insensitive",
              },
            },
          },
        },
      },
      include: {
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
      },
    });
    sendSuccess(res, birds, "Birds fetched successfully", STATUS.OK);
    return;
  } catch (error) {
    console.error("Error fetching birds for event:", error);
    sendError(
      res,
      "Failed to fetch birds for event",
      {},
      STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

export { getMyBirds, updateBird, addBird, getBirdsPerEvent };
