import type { Request, Response } from "express";
import { sendError, sendSuccess } from "../types/api-response";
import { STATUS } from "../utils/statusCodes";
import validateSchema from "../utils/validators";
import {
  createEventSchemaBody,
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
    const feeSchemaIds = [validatedData.feeSchemaId];
    const prizeSchemaIds = [
      validatedData.finalRacePrizeSchemaId,
      validatedData.hotspot1PrizeSchemaId,
      validatedData.hotspot2PrizeSchemaId,
      validatedData.hotspot3PrizeSchemaId,
      validatedData.avgWinnerPrizeSchemaId,
    ];

    const [feeSchemas, prizeSchemas] = await Promise.all([
      prisma.feeSchema.findMany({
        where: { id: { in: feeSchemaIds } },
        select: { id: true },
      }),
      prisma.prizeSchema.findMany({
        where: { id: { in: prizeSchemaIds } },
        select: { id: true },
      }),
    ]);

    if (feeSchemaIds.length != feeSchemas.length) {
      sendError(res, "Fee schema not found", {}, STATUS.BAD_REQUEST);
      return;
    }
    if (prizeSchemaIds.length != prizeSchemas.length) {
      sendError(res, "Prize schema not found", {}, STATUS.BAD_REQUEST);
      return;
    }

    const event = await prisma.event.create({
      data: {
        ...validatedData,
        creatorId: req.user.id,
      },
    });
    sendSuccess(res, event, "Event created successfully", STATUS.CREATED);
  } catch (error) {
    console.error("Error creating event:", error);
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
      data: validatedData,
    });
    sendSuccess(res, updatedEvent, "Event updated successfully", STATUS.OK);
  } catch (error) {
    console.error("Error updating event:", error);
    sendError(res, "Failed to update event", {}, STATUS.INTERNAL_SERVER_ERROR);
  }
};

const listEvents = async (req: Request, res: Response) => {
  const pagination = validateSchema(req, res, "query", paginationSchema);
  if (!pagination) {
    return;
  }
  try {
    const events = await prisma.event.findMany({
      skip: (pagination.page - 1) * pagination.limit,
      take: pagination.limit,
      orderBy: { createdAt: "desc" },
    });
    const totalCount = await prisma.event.count();
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

export { createEvent, updateEvent, listEvents, listEventsByCreator };
