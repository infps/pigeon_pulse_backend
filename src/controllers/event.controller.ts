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
    const event = await prisma.events.create({
      data: {
        eventName: validatedData.eventName,
        eventShortName: validatedData.eventShortName,
        eventDate: validatedData.eventDate,
        eventType: validatedData.eventType,
        isOpen: validatedData.isOpen,
        idFeeScheme: validatedData.idFeeScheme,
        idFinalPrizeScheme: validatedData.idFinalPrizeScheme,
        idHotSpot1PrizeScheme: validatedData.idHotSpot1PrizeScheme,
        idHotSpot2PrizeScheme: validatedData.idHotSpot2PrizeScheme,
        idHotSpot3PrizeScheme: validatedData.idHotSpot3PrizeScheme,
        idHotSpotAvgPrizeScheme: validatedData.idHotSpotAvgPrizeScheme,
        idBettingScheme: validatedData.idBettingScheme,
        creatorId: userId,
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
    const event = await prisma.events.findUnique({
      where: { idEvent: validatedParams.id, creatorId: req.user.id },
      select: { idEvent: true },
    });
    if (!event) {
      sendError(res, "Event not found", {}, STATUS.NOT_FOUND);
      return;
    }
    const updatedEvent = await prisma.events.update({
      where: { idEvent: validatedParams.id, creatorId: req.user.id },
      data: {
        eventName: validatedData.eventName,
        eventShortName: validatedData.eventShortName,
        eventDate: validatedData.eventDate,
        eventType: validatedData.eventType,
        isOpen: validatedData.isOpen,
        idFeeScheme: validatedData.idFeeScheme,
        idHotSpotAvgPrizeScheme: validatedData.idHotSpotAvgPrizeScheme,
        idHotSpot1PrizeScheme: validatedData.idHotSpot1PrizeScheme,
        idHotSpot2PrizeScheme: validatedData.idHotSpot2PrizeScheme,
        idHotSpot3PrizeScheme: validatedData.idHotSpot3PrizeScheme,
        idFinalPrizeScheme: validatedData.idFinalPrizeScheme,
        idBettingScheme: validatedData.idBettingScheme,
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
    const events = await prisma.events.findMany({
      where: { isOpen: pagination.isOpen || undefined },
      select: {
        idEvent: true,
        eventDate: true,
        eventName: true,
        eventShortName: true,
        isOpen: true,
        _count: {
          select: {
            eventInventories: true,
          },
        },
      },
      skip: (pagination.page - 1) * pagination.limit,
      take: pagination.limit,
    });
    const totalCount = await prisma.events.count({
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
    const events = await prisma.events.findMany({
      where: { creatorId: req.user.id },
      // skip: (pagination.page - 1) * pagination.limit,
      // take: pagination.limit,
    });
    const totalCount = await prisma.events.count({
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
    const event = await prisma.events.findUnique({
      where: { idEvent: validatedParams.id },
      select: {
        idEvent: true,
        eventName: true,
        eventShortName: true,
        eventDate: true,
        isOpen: true,
        eventType: true,
        _count: {
          select: {
            eventInventories: true,
          },
        },
        idFeeScheme: true,
        idHotSpotAvgPrizeScheme: true,
        idHotSpot1PrizeScheme: true,
        idHotSpot2PrizeScheme: true,
        idHotSpot3PrizeScheme: true,
        idBettingScheme: true,
        idFinalPrizeScheme: true,
        feeScheme: {
          select: {
            maxBirdCount: true,
            entryFee: true,
            hotSpot1Fee: true,
            hotSpot2Fee: true,
            hotSpot3Fee: true,
            hotSpotFinalFee: true,
            perchFeeItems: true,
          },
        },

        finalPrizeScheme: {
          select: {
            prizeSchemeItems: {
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
    const events = await prisma.events.findMany({
      where: {
        NOT: { idEvent: validatedParams.id },
        isOpen: pagination.isOpen || undefined,
      },
      select: {
        idEvent: true,
        eventDate: true,
        eventName: true,
        eventShortName: true,
        isOpen: true,
        _count: {
          select: {
            eventInventories: true,
          },
        },
      },
      skip: (pagination.page - 1) * pagination.limit,
      take: pagination.limit,
    });
    const totalCount = await prisma.events.count({
      where: {
        NOT: { idEvent: validatedParams.id },
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
