import type { Request, Response } from "express";
import { sendError, sendSuccess } from "../types/api-response";
import { STATUS } from "../utils/statusCodes";
import validateSchema from "../utils/validators";
import {
  createPrizeSchemaBody,
  feeSchemaCreate,
  idParamsSchema,
} from "../schema/zod";
import { prisma } from "../lib/prisma";
const createFeeSchema = async (req: Request, res: Response) => {
  if (!req.user) {
    sendError(res, "Unauthorized access", {}, STATUS.UNAUTHORIZED);
    return;
  }
  const validatedData = validateSchema(req, res, "body", feeSchemaCreate);
  if (!validatedData) {
    return;
  }
  try {
    const feeSchema = await prisma.feeSchema.create({
      data: {
        ...validatedData,
        createdById: req.user.id,
      },
    });
    sendSuccess(
      res,
      feeSchema,
      "Fee schema created successfully",
      STATUS.CREATED
    );
  } catch (error) {
    console.error("Error creating fee schema:", error);
    sendError(
      res,
      "Failed to create fee schema",
      {},
      STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

const getFeeSchemas = async (req: Request, res: Response) => {
  if (!req.user) {
    sendError(res, "Unauthorized access", {}, STATUS.UNAUTHORIZED);
    return;
  }
  try {
    const feeSchema = await prisma.feeSchema.findMany({
      where: { createdById: req.user.id },
      select: {
        id: true,
        name: true,
      },
    });
    sendSuccess(
      res,
      feeSchema,
      "Fee schemas retrieved successfully",
      STATUS.OK
    );
  } catch (error) {
    console.error("Error retrieving fee schemas:", error);
    sendError(
      res,
      "Failed to retrieve fee schemas",
      {},
      STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

const getFeeSchema = async (req: Request, res: Response) => {
  if (!req.user) {
    sendError(res, "Unauthorized access", {}, STATUS.UNAUTHORIZED);
    return;
  }
  const validatedParams = validateSchema(req, res, "params", idParamsSchema);
  if (!validatedParams) {
    return;
  }
  try {
    const feeSchema = await prisma.feeSchema.findUnique({
      where: { id: validatedParams.id, createdById: req.user.id },
    });
    if (!feeSchema) {
      sendError(res, "Fee schema not found", {}, STATUS.NOT_FOUND);
      return;
    }
    sendSuccess(res, feeSchema, "Fee schema retrieved successfully", STATUS.OK);
  } catch (error) {
    console.error("Error retrieving fee schema:", error);
    sendError(
      res,
      "Failed to retrieve fee schema",
      {},
      STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

const deleteFeeSchema = async (req: Request, res: Response) => {
  if (!req.user) {
    sendError(res, "Unauthorized access", {}, STATUS.UNAUTHORIZED);
    return;
  }
  const validatedParams = validateSchema(req, res, "params", idParamsSchema);
  if (!validatedParams) {
    return;
  }
  try {
    const feeSchema = await prisma.feeSchema.findUnique({
      where: { id: validatedParams.id, createdById: req.user.id },
      select: { id: true },
    });
    if (!feeSchema) {
      sendError(res, "Fee schema not found", {}, STATUS.NOT_FOUND);
      return;
    }
    const events = await prisma.event.findMany({
      where: { feeSchemaId: validatedParams.id },
      select: { id: true },
    });
    if (events.length > 0) {
      sendError(
        res,
        "Cannot delete fee schema with associated events",
        {},
        STATUS.BAD_REQUEST
      );
      return;
    }
    await prisma.feeSchema.delete({
      where: { id: validatedParams.id },
    });
    sendSuccess(res, {}, "Fee schema deleted successfully", STATUS.OK);
  } catch (error) {
    console.error("Error deleting fee schema:", error);
    sendError(
      res,
      "Failed to delete fee schema",
      {},
      STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

const updateFeeSchema = async (req: Request, res: Response) => {
  if (!req.user) {
    sendError(res, "Unauthorized access", {}, STATUS.UNAUTHORIZED);
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
    feeSchemaCreate.partial()
  );
  if (!validatedData) {
    return;
  }
  try {
    const feeSchema = await prisma.feeSchema.findUnique({
      where: { id: validatedParams.id, createdById: req.user.id },
      select: { id: true },
    });
    if (!feeSchema) {
      sendError(res, "Fee schema not found", {}, STATUS.NOT_FOUND);
      return;
    }
    const updatedFeeSchema = await prisma.feeSchema.update({
      where: { id: validatedParams.id },
      data: validatedData,
    });
    sendSuccess(
      res,
      updatedFeeSchema,
      "Fee schema updated successfully",
      STATUS.OK
    );
  } catch (error) {
    console.error("Error updating fee schema:", error);
    sendError(
      res,
      "Failed to update fee schema",
      {},
      STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

const createPrizeSchema = async (req: Request, res: Response) => {
  if (!req.user) {
    sendError(res, "Unauthorized access", {}, STATUS.UNAUTHORIZED);
    return;
  }
  const validatedData = validateSchema(req, res, "body", createPrizeSchemaBody);
  if (!validatedData) {
    return;
  }
  try {
    const prizeSchema = await prisma.prizeSchema.create({
      data: {
        name: validatedData.name,
        createdById: req.user.id,
        distributions: {
          createMany: {
            data: validatedData.distributions.map((distribution) => ({
              fromPosition: distribution.fromPosition,
              toPosition: distribution.toPosition,
              percentage: distribution.percentage,
            })),
          },
        },
      },
    });
    sendSuccess(
      res,
      prizeSchema,
      "Prize schema created successfully",
      STATUS.CREATED
    );
  } catch (error) {
    console.error("Error creating prize schema:", error);
    sendError(
      res,
      "Failed to create prize schema",
      {},
      STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

const getPrizeSchemas = async (req: Request, res: Response) => {
  if (!req.user) {
    sendError(res, "Unauthorized access", {}, STATUS.UNAUTHORIZED);
    return;
  }
  try {
    const prizeSchema = await prisma.prizeSchema.findMany({
      where: { createdById: req.user.id },
      select: {
        id: true,
        name: true,
      },
    });
    sendSuccess(
      res,
      prizeSchema,
      "Prize schemas retrieved successfully",
      STATUS.OK
    );
  } catch (error) {
    console.error("Error retrieving prize schemas:", error);
    sendError(
      res,
      "Failed to retrieve prize schemas",
      {},
      STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

const getPrizeSchema = async (req: Request, res: Response) => {
  if (!req.user) {
    sendError(res, "Unauthorized access", {}, STATUS.UNAUTHORIZED);
    return;
  }
  const validatedParams = validateSchema(req, res, "params", idParamsSchema);
  if (!validatedParams) {
    return;
  }
  try {
    const prizeSchema = await prisma.prizeSchema.findUnique({
      where: { id: validatedParams.id, createdById: req.user.id },
      select: {
        id: true,
        name: true,
        distributions: {
          select: {
            fromPosition: true,
            toPosition: true,
            percentage: true,
          },
        },
      },
    });
    if (!prizeSchema) {
      sendError(res, "Prize schema not found", {}, STATUS.NOT_FOUND);
      return;
    }
    sendSuccess(
      res,
      prizeSchema,
      "Prize schema retrieved successfully",
      STATUS.OK
    );
  } catch (error) {
    console.error("Error retrieving prize schema:", error);
    sendError(
      res,
      "Failed to retrieve prize schema",
      {},
      STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

const updatePrizeSchema = async (req: Request, res: Response) => {
  if (!req.user) {
    sendError(res, "Unauthorized access", {}, STATUS.UNAUTHORIZED);
    return;
  }
  const validatedParams = validateSchema(req, res, "params", idParamsSchema);
  if (!validatedParams) {
    sendError(res, "Invalid parameters", {}, STATUS.BAD_REQUEST);
    return;
  }
  const validatedData = validateSchema(req, res, "body", createPrizeSchemaBody);
  if (!validatedData) {
    return;
  }
  try {
    const prizeSchema = await prisma.prizeSchema.findUnique({
      where: { id: validatedParams.id, createdById: req.user.id },
      select: { id: true },
    });
    if (!prizeSchema) {
      sendError(res, "Prize schema not found", {}, STATUS.NOT_FOUND);
      return;
    }
    const updatedPrizeSchema = await prisma.prizeSchema.update({
      where: { id: validatedParams.id },
      data: {
        name: validatedData.name,
        distributions: {
          deleteMany: {},
          createMany: {
            data: validatedData.distributions.map((distribution) => ({
              fromPosition: distribution.fromPosition,
              toPosition: distribution.toPosition,
              percentage: distribution.percentage,
            })),
          },
        },
      },
    });
    sendSuccess(
      res,
      updatedPrizeSchema,
      "Prize schema updated successfully",
      STATUS.OK
    );
  } catch (error) {
    console.error("Error updating prize schema:", error);
    sendError(
      res,
      "Failed to update prize schema",
      {},
      STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

const deletePrizeSchema = async (req: Request, res: Response) => {
  if (!req.user) {
    sendError(res, "Unauthorized access", {}, STATUS.UNAUTHORIZED);
    return;
  }
  const validatedParams = validateSchema(req, res, "params", idParamsSchema);
  if (!validatedParams) {
    return;
  }
  try {
    const prizeSchema = await prisma.prizeSchema.findUnique({
      where: { id: validatedParams.id, createdById: req.user.id },
      select: { id: true },
    });
    if (!prizeSchema) {
      sendError(res, "Prize schema not found", {}, STATUS.NOT_FOUND);
      return;
    }
    const events = await prisma.event.findMany({
      where: {
        OR: [
          { hotspot1PrizeSchemaId: validatedParams.id },
          { hotspot2PrizeSchemaId: validatedParams.id },
          { hotspot3PrizeSchemaId: validatedParams.id },
          { finalRacePrizeSchemaId: validatedParams.id },
          { avgWinnerPrizeSchemaId: validatedParams.id },
        ],
      },
      select: { id: true },
    });
    if (events.length > 0) {
      sendError(
        res,
        "Cannot delete prize schema with associated events",
        {},
        STATUS.BAD_REQUEST
      );
      return;
    }
    await prisma.prizeSchema.delete({
      where: { id: validatedParams.id },
    });
    sendSuccess(res, {}, "Prize schema deleted successfully", STATUS.OK);
  } catch (error) {
    console.error("Error deleting prize schema:", error);
    sendError(
      res,
      "Failed to delete prize schema",
      {},
      STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

export {
  createFeeSchema,
  getFeeSchemas,
  getFeeSchema,
  deleteFeeSchema,
  updateFeeSchema,
  createPrizeSchema,
  getPrizeSchemas,
  getPrizeSchema,
  updatePrizeSchema,
  deletePrizeSchema,
};
