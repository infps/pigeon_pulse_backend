import type { Request, Response } from "express";
import { sendError, sendSuccess } from "../types/api-response";
import { STATUS } from "../utils/statusCodes";
import validateSchema from "../utils/validators";
import {
  createEventSchemaBody,
  eventsQuerySchema,
  idParamsSchema,
  paginationSchema,
} from "../schema/zod";
import { prisma } from "../lib/prisma";
const createEvent = async (req: Request, res: Response) => {
  if (!req.user) {
    sendError(res, "Unauthorized", {}, STATUS.UNAUTHORIZED);
    return;
  }
  const validatedData = validateSchema(req, res, "body", createEventSchemaBody);
  if (!validatedData) {
    return;
  }
  try {
    const userId = req.user.id;
    const event = await prisma.event.create({
      data: {
        name: validatedData.name,
        shortName: validatedData.shortName,
        date: validatedData.date,
        type: validatedData.type,
        isOpen: validatedData.isOpen,
        feeSchemaId: validatedData.feeSchemaId,
        avgWinnerPrizeSchemaId: validatedData.avgWinnerPrizeSchemaId,
        hotspot1PrizeSchemaId: validatedData.hotspot1PrizeSchemaId,
        hotspot2PrizeSchemaId: validatedData.hotspot2PrizeSchemaId,
        hotspot3PrizeSchemaId: validatedData.hotspot3PrizeSchemaId,
        finalRacePrizeSchemaId: validatedData.finalRacePrizeSchemaId,
        bettingSchemeId: validatedData.bettingSchemaId,
        creatorId: userId,
        finalFrom: validatedData.finalFrom,
        finalTo: validatedData.finalTo,
        hotspotFrom: validatedData.hotspotFrom,
        hotspotTo: validatedData.hotspotTo,
        inventoryFrom: validatedData.inventoryFrom,
        inventoryTo: validatedData.inventoryTo,
        trainingFrom: validatedData.trainingFrom,
        trainingTo: validatedData.trainingTo,
      },
    });

    sendSuccess(res, event, "Event created successfully", STATUS.CREATED);
  } catch (error: any) {
    console.error("Error creating event:", error);
    if (error.code === "P2003") {
      sendError(res, "Invalid data", {}, STATUS.BAD_REQUEST);
      return;
    }
    sendError(res, "Failed to create event", {}, STATUS.INTERNAL_SERVER_ERROR);
  }
};

const updateEvent = async (req: Request, res: Response) => {
  if (!req.user) {
    sendError(res, "Unauthorized", {}, STATUS.UNAUTHORIZED);
    return;
  }

  const validatedParams = validateSchema(req, res, "params", idParamsSchema);
  if (!validatedParams) {
    return;
  }
  const validatedData = validateSchema(
    req,
    res,
    "body",
    createEventSchemaBody.partial()
  );
  if (!validatedData) {
    return;
  }
  try {
    const event = await prisma.event.findUnique({
      where: { id: validatedParams.id, creatorId: req.user.id },
      select: { id: true },
    });
    if (!event) {
      sendError(res, "Event not found", {}, STATUS.NOT_FOUND);
      return;
    }
    const updatedEvent = await prisma.event.update({
      where: { id: validatedParams.id, creatorId: req.user.id },
      data: {
        name: validatedData.name,
        shortName: validatedData.shortName,
        date: validatedData.date,
        type: validatedData.type,
        isOpen: validatedData.isOpen,
        feeSchemaId: validatedData.feeSchemaId,
        avgWinnerPrizeSchemaId: validatedData.avgWinnerPrizeSchemaId,
        hotspot1PrizeSchemaId: validatedData.hotspot1PrizeSchemaId,
        hotspot2PrizeSchemaId: validatedData.hotspot2PrizeSchemaId,
        hotspot3PrizeSchemaId: validatedData.hotspot3PrizeSchemaId,
        finalRacePrizeSchemaId: validatedData.finalRacePrizeSchemaId,
        bettingSchemeId: validatedData.bettingSchemaId,
        finalFrom: validatedData.finalFrom,
        finalTo: validatedData.finalTo,
        hotspotFrom: validatedData.hotspotFrom,
        hotspotTo: validatedData.hotspotTo,
        inventoryFrom: validatedData.inventoryFrom,
        inventoryTo: validatedData.inventoryTo,
        trainingFrom: validatedData.trainingFrom,
        trainingTo: validatedData.trainingTo,
      },
    });
    sendSuccess(res, updatedEvent, "Event updated successfully", STATUS.OK);
  } catch (error) {
    console.error("Error updating event:", error);
    sendError(res, "Failed to update event", {}, STATUS.INTERNAL_SERVER_ERROR);
  }
};

const listEvents = async (req: Request, res: Response) => {
  const pagination = validateSchema(req, res, "query", eventsQuerySchema);
  if (!pagination) {
    return;
  }
  try {
    const events = await prisma.event.findMany({
      where: { isOpen: pagination.isOpen || undefined },
      select: {
        id: true,
        date: true,
        name: true,
        shortName: true,
        isOpen: true,
        _count: {
          select: {
            eventInventoryItems: true,
          },
        },
      },
      skip: (pagination.page - 1) * pagination.limit,
      take: pagination.limit,
      orderBy: { createdAt: "desc" },
    });
    const totalCount = await prisma.event.count({
      where: { isOpen: pagination.isOpen || undefined },
    });
    sendSuccess(
      res,
      { events, totalCount },
      "Events retrieved successfully",
      STATUS.OK
    );
  } catch (error) {
    console.error("Error listing events:", error);
    sendError(res, "Failed to list events", {}, STATUS.INTERNAL_SERVER_ERROR);
  }
};

const listEventsByCreator = async (req: Request, res: Response) => {
  if (!req.user) {
    sendError(res, "Unauthorized", {}, STATUS.UNAUTHORIZED);
    return;
  }
  const pagination = validateSchema(req, res, "query", paginationSchema);
  if (!pagination) {
    return;
  }
  try {
    const events = await prisma.event.findMany({
      where: { creatorId: req.user.id },
      skip: (pagination.page - 1) * pagination.limit,
      take: pagination.limit,
      orderBy: { createdAt: "desc" },
    });
    const totalCount = await prisma.event.count({
      where: { creatorId: req.user.id },
    });
    sendSuccess(
      res,
      { events, totalCount },
      "Events by creator retrieved successfully",
      STATUS.OK
    );
  } catch (error) {
    console.error("Error listing events by creator:", error);
    sendError(
      res,
      "Failed to list events by creator",
      {},
      STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

const listEvent = async (req: Request, res: Response) => {
  const validatedParams = validateSchema(req, res, "params", idParamsSchema);
  if (!validatedParams) {
    return;
  }
  try {
    const event = await prisma.event.findUnique({
      where: { id: validatedParams.id },
      select: {
        id: true,
        name: true,
        shortName: true,
        date: true,
        isOpen: true,
        type: true,
        _count: {
          select: {
            eventInventoryItems: true,
          },
        },
        feeSchemaId: true,
        avgWinnerPrizeSchemaId: true,
        hotspot1PrizeSchemaId: true,
        hotspot2PrizeSchemaId: true,
        hotspot3PrizeSchemaId: true,
        bettingSchemeId: true,
        finalRacePrizeSchemaId: true,
        finalFrom: true,
        finalTo: true,
        hotspotFrom: true,
        hotspotTo: true,
        inventoryFrom: true,
        inventoryTo: true,
        trainingFrom: true,
        trainingTo: true,
        feeSchema: {
          select: {
            maxBirdCount:true,
            entryFee: true,
            hotSpot1Fee: true,
            hotSpot2Fee: true,
            hotSpot3Fee: true,
            hotSpotFinalFee: true,
            perchFeeItems:true
          },
        },

        finalRacePrizeSchema: {
          select: {
            distributions: {
              select: {
                fromPosition: true,
                toPosition: true,
                prizeValue: true,
              },
            },
          },
        },
      },
    });
    if (!event) {
      sendError(res, "Event not found", {}, STATUS.NOT_FOUND);
      return;
    }
    sendSuccess(res, event, "Event retrieved successfully", STATUS.OK);
  } catch (error) {
    console.error("Error retrieving event:", error);
    sendError(
      res,
      "Failed to retrieve event",
      {},
      STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

const getMoreEvents = async (req: Request, res: Response) => {
  const pagination = validateSchema(req, res, "query", eventsQuerySchema);
  if (!pagination) {
    return;
  }
  const validatedParams = validateSchema(req, res, "params", idParamsSchema);
  if (!validatedParams) {
    return;
  }
  try {
    const events = await prisma.event.findMany({
      where: {
        NOT: { id: validatedParams.id },
        isOpen: pagination.isOpen || undefined,
      },
      select: {
        id: true,
        date: true,
        name: true,
        shortName: true,
        isOpen: true,
        _count: {
          select: {
            eventInventoryItems: true,
          },
        },
      },
      skip: (pagination.page - 1) * pagination.limit,
      take: pagination.limit,
      orderBy: { createdAt: "desc" },
    });
    const totalCount = await prisma.event.count({
      where: {
        NOT: { id: validatedParams.id },
        isOpen: pagination.isOpen || undefined,
      },
    });
    sendSuccess(
      res,
      { events, totalCount },
      "More events retrieved successfully",
      STATUS.OK
    );
  } catch (error) {
    console.error("Error retrieving more events:", error);
    sendError(
      res,
      "Failed to retrieve more events",
      {},
      STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

export {
  createEvent,
  updateEvent,
  listEvents,
  listEventsByCreator,
  listEvent,
  getMoreEvents,
};
