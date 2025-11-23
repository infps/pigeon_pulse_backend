import type { Request, Response } from "express";
import { sendError, sendSuccess } from "../types/api-response";
import { STATUS } from "../utils/statusCodes";
import validateSchema from "../utils/validators";
import {
  createBettingSchemaBody,
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
  console.log(req.user)
  try {
    const feeScheme = await prisma.feeScheme.create({
      data: {
        feeSchemeName: validatedData.feeSchemeName,
        entryFee: validatedData.entryFee,
        feesCutPercent: validatedData.feesCutPercent,
        hotSpot1Fee: validatedData.hotSpot1Fee,
        hotSpot2Fee: validatedData.hotSpot2Fee,
        hotSpot3Fee: validatedData.hotSpot3Fee,
        hotSpotFinalFee: validatedData.hotSpotFinalFee,
        maxBackupBirdCount: validatedData.maxBackupBirdCount,
        maxBirdCount: validatedData.maxBirdCount,
        minEntryFees: validatedData.minEntryFees,
        creatorId: req.user.id,
        isFloatingBackup: validatedData.isFloatingBackup,
        isRefundable: validatedData.isRefundable,
        perchFeeItems:{
          createMany:{
            data: validatedData.perchFees.map((item) => ({
              birdNo: item.birdNo,
              perchFee: item.perchFee,
            })),
          },
        }
      },
    });
    sendSuccess(
      res,
      feeScheme,
      "Fee scheme created successfully",
      STATUS.CREATED
    );
  } catch (error) {
    console.error("Error creating fee scheme:", error);
    sendError(
      res,
      "Failed to create fee scheme",
      {},
      STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

const createBettingSchema = async (req: Request, res: Response) => {
  if (!req.user) {
    sendError(res, "Unauthorized access", {}, STATUS.UNAUTHORIZED);
    return;
  }
  const validatedData = validateSchema(
    req,
    res,
    "body",
    createBettingSchemaBody
  );
  if (!validatedData) {
    return;
  }
  try {
    const bettingSchema = await prisma.bettingScheme.create({
      data: {
        creatorId: req.user.id,
        bettingSchemeName: validatedData.bettingSchemeName,
        bettingCutPercent: validatedData.bettingCutPercent,
        belgianShow1: validatedData.belgianShow1,
        belgianShow2: validatedData.belgianShow2,
        belgianShow3: validatedData.belgianShow3,
        belgianShow4: validatedData.belgianShow4,
        belgianShow5: validatedData.belgianShow5,
        belgianShow6: validatedData.belgianShow6,
        belgianShow7: validatedData.belgianShow7,
        standardShow1: validatedData.standardShow1,
        standardShow2: validatedData.standardShow2,
        standardShow3: validatedData.standardShow3,
        standardShow4: validatedData.standardShow4,
        standardShow5: validatedData.standardShow5,
        standardShow6: validatedData.standardShow6,
        wta1: validatedData.wta1,
        wta2: validatedData.wta2,
        wta3: validatedData.wta3,
        wta4: validatedData.wta4,
        wta5: validatedData.wta5,
        standardShowPercentages: {
          createMany: {
            data: validatedData.standardShowPercentages.map((item) => ({
              place: item.place,
              percValue: item.percValue,
            })),
          },
        },
      },
    });
    sendSuccess(
      res,
      bettingSchema,
      "Betting schema created successfully",
      STATUS.CREATED
    );
  } catch (error) {
    console.error("Error creating betting schema:", error);
    sendError(
      res,
      "Failed to create betting schema",
      {},
      STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

const getBettingSchemas = async (req: Request, res: Response) => {
  if (!req.user) {
    sendError(res, "Unauthorized access", {}, STATUS.UNAUTHORIZED);
    return;
  }
  try {
    const bettingSchemas = await prisma.bettingScheme.findMany({
      select: {
        idBettingScheme: true,
        bettingSchemeName: true,
      },
    });
    sendSuccess(
      res,
      bettingSchemas,
      "Betting schemas retrieved successfully",
      STATUS.OK
    );
  } catch (error) {
    console.error("Error retrieving betting schemas:", error);
    sendError(
      res,
      "Failed to retrieve betting schemas",
      {},
      STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

const getBettingSchema = async (req: Request, res: Response) => {
  if (!req.user) {
    sendError(res, "Unauthorized access", {}, STATUS.UNAUTHORIZED);
    return;
  }
  const validatedParams = validateSchema(req, res, "params", idParamsSchema);
  if (!validatedParams) {
    return;
  }
  try {
    const bettingSchema = await prisma.bettingScheme.findUnique({
      where: { idBettingScheme: validatedParams.id },
    });
    if (!bettingSchema) {
      sendError(res, "Betting schema not found", {}, STATUS.NOT_FOUND);
      return;
    }
    sendSuccess(
      res,
      bettingSchema,
      "Betting scheme retrieved successfully",
      STATUS.OK
    );
  } catch (error) {
    console.error("Error retrieving betting scheme:", error);
    sendError(
      res,
      "Failed to retrieve betting schema",
      {},
      STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

const deleteBettingSchema = async (req: Request, res: Response) => {
  if (!req.user) {
    sendError(res, "Unauthorized access", {}, STATUS.UNAUTHORIZED);
    return;
  }
  const validatedParams = validateSchema(req, res, "params", idParamsSchema);
  if (!validatedParams) {
    return;
  }
  try {
    const bettingSchema = await prisma.bettingScheme.findUnique({
      where: { idBettingScheme: validatedParams.id },
      select: { idBettingScheme: true },
    });
    if (!bettingSchema) {
      sendError(res, "Betting schema not found", {}, STATUS.NOT_FOUND);
      return;
    }
    await prisma.bettingScheme.delete({
      where: { idBettingScheme: validatedParams.id },
    });
    sendSuccess(res, {}, "Betting scheme deleted successfully", STATUS.OK);
  } catch (error) {
    console.error("Error deleting betting scheme:", error);
    sendError(
      res,
      "Failed to delete betting scheme",
      {},
      STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

const updateBettingSchema = async (req: Request, res: Response) => {
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
    createBettingSchemaBody
  );
  if (!validatedData) {
    return;
  }
  try {
    const bettingSchema = await prisma.bettingScheme.findUnique({
      where: { idBettingScheme: validatedParams.id },
      select: { idBettingScheme: true },
    });
    if (!bettingSchema) {
      sendError(res, "Betting scheme not found", {}, STATUS.NOT_FOUND);
      return;
    }
    const updatedBettingSchema = await prisma.bettingScheme.update({
      where: { idBettingScheme: validatedParams.id },
      data: {
        bettingSchemeName: validatedData.bettingSchemeName,
        bettingCutPercent: validatedData.bettingCutPercent,
        belgianShow1: validatedData.belgianShow1,
        belgianShow2: validatedData.belgianShow2,
        belgianShow3: validatedData.belgianShow3,
        belgianShow4: validatedData.belgianShow4,
        belgianShow5: validatedData.belgianShow5,
        belgianShow6: validatedData.belgianShow6,
        belgianShow7: validatedData.belgianShow7,
        standardShow1: validatedData.standardShow1,
        standardShow2: validatedData.standardShow2,
        standardShow3: validatedData.standardShow3,
        standardShow4: validatedData.standardShow4,
        standardShow5: validatedData.standardShow5,
        standardShow6: validatedData.standardShow6,
        wta1: validatedData.wta1,
        wta2: validatedData.wta2,
        wta3: validatedData.wta3,
        wta4: validatedData.wta4,
        wta5: validatedData.wta5,
        standardShowPercentages: {
          deleteMany: {},
          createMany: {
            data: validatedData.standardShowPercentages.map((item) => ({
              place: item.place,
              percValue: item.percValue,
            })),
          },
        },
      },
    });

    sendSuccess(
      res,
      updatedBettingSchema,
      "Betting schema updated successfully",
      STATUS.OK
    );
  } catch (error) {
    console.error("Error updating betting schema:", error);
    sendError(
      res,
      "Failed to update betting schema",
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
    const feeSchema = await prisma.feeScheme.findMany({
      where: { creatorId: req.user.id },
      select: {
        idFeeScheme: true,
        feeSchemeName: true,
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
    const feeSchema = await prisma.feeScheme.findUnique({
      where: { idFeeScheme: validatedParams.id, creatorId: req.user.id },
      include:{
        perchFeeItems:true
      }
    });
    if (!feeSchema) {
      sendError(res, "Fee scheme not found", {}, STATUS.NOT_FOUND);
      return;
    }
    sendSuccess(res, feeSchema, "Fee scheme retrieved successfully", STATUS.OK);
  } catch (error) {
    console.error("Error retrieving fee scheme:", error);
    sendError(
      res,
      "Failed to retrieve fee scheme",
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
    const feeSchema = await prisma.feeScheme.findUnique({
      where: { idFeeScheme: validatedParams.id, creatorId: req.user.id },
      select: { idFeeScheme: true },
    });
    if (!feeSchema) {
      sendError(res, "Fee scheme not found", {}, STATUS.NOT_FOUND);
      return;
    }
    const events = await prisma.events.findMany({
      where: { idFeeScheme: validatedParams.id },
      select: { idEvent: true },
    });
    if (events.length > 0) {
      sendError(
        res,
        "Cannot delete fee scheme with associated events",
        {},
        STATUS.BAD_REQUEST
      );
      return;
    }
    await prisma.feeScheme.delete({
      where: { idFeeScheme: validatedParams.id },
    });
    sendSuccess(res, {}, "Fee scheme deleted successfully", STATUS.OK);
  } catch (error) {
    console.error("Error deleting fee scheme:", error);
    sendError(
      res,
      "Failed to delete fee scheme",
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
    const feeSchema = await prisma.feeScheme.findUnique({
      where: { idFeeScheme: validatedParams.id, creatorId: req.user.id },
      select: { idFeeScheme: true },
    });
    if (!feeSchema) {
      sendError(res, "Fee scheme not found", {}, STATUS.NOT_FOUND);
      return;
    }
    const updatedFeeScheme = await prisma.feeScheme.update({
      where: { idFeeScheme: validatedParams.id },
      data: {
        feeSchemeName: validatedData.feeSchemeName,
        entryFee: validatedData.entryFee,
        feesCutPercent: validatedData.feesCutPercent,
        hotSpot1Fee: validatedData.hotSpot1Fee,
        hotSpot2Fee: validatedData.hotSpot2Fee,
        hotSpot3Fee: validatedData.hotSpot3Fee,
        hotSpotFinalFee: validatedData.hotSpotFinalFee,
        maxBackupBirdCount: validatedData.maxBackupBirdCount,
        maxBirdCount: validatedData.maxBirdCount,
        minEntryFees: validatedData.minEntryFees,
        creatorId: req.user.id,
        isFloatingBackup: validatedData.isFloatingBackup,
        isRefundable: validatedData.isRefundable,
        perchFeeItems:{
          deleteMany:{},
          createMany:{
            data: validatedData.perchFees?.map((item) => ({
              birdNo: item.birdNo,
              perchFee: item.perchFee,
            })) || [],
          },
        }
      },
    });
    sendSuccess(
      res,
      updatedFeeScheme,
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
    const prizeScheme = await prisma.prizeScheme.create({
      data: {
        prizeName: validatedData.prizeName,
        creatorId: req.user.id,
        prizeSchemeItems: {
          createMany: {
            data: validatedData.prizeSchemeItems.map((distribution) => ({
              fromPosition: distribution.fromPosition,
              toPosition: distribution.toPosition,
              prizeValue: distribution.prizeValue,
            })),
          },
        },
      },
    });
    sendSuccess(
      res,
      prizeScheme,
      "Prize scheme created successfully",
      STATUS.CREATED
    );
  } catch (error) {
    console.error("Error creating prize scheme:", error);
    sendError(
      res,
      "Failed to create prize scheme",
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
    const prizeScheme = await prisma.prizeScheme.findMany({
      where: { creatorId: req.user.id },
      select: {
        idPrizeScheme: true,
        prizeName: true,
      },
    });
    sendSuccess(
      res,
      prizeScheme,
      "Prize schemes retrieved successfully",
      STATUS.OK
    );
  } catch (error) {
    console.error("Error retrieving prize schemes:", error);
    sendError(
      res,
      "Failed to retrieve prize schemes",
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
    const prizeScheme = await prisma.prizeScheme.findUnique({
      where: { idPrizeScheme: validatedParams.id, creatorId: req.user.id },
      select: {
        idPrizeScheme: true,
        prizeName: true,
        prizeSchemeItems: {
          select: {
            fromPosition: true,
            toPosition: true,
            prizeValue: true,
          },
        },
      },
    });
    if (!prizeScheme) {
      sendError(res, "Prize scheme not found", {}, STATUS.NOT_FOUND);
      return;
    }
    sendSuccess(
      res,
      prizeScheme,
      "Prize scheme retrieved successfully",
      STATUS.OK
    );
  } catch (error) {
    console.error("Error retrieving prize scheme:", error);
    sendError(
      res,
      "Failed to retrieve prize scheme",
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
    const prizeScheme = await prisma.prizeScheme.findUnique({
      where: { idPrizeScheme: validatedParams.id, creatorId: req.user.id },
      select: { idPrizeScheme: true },
    });
    if (!prizeScheme) {
      sendError(res, "Prize scheme not found", {}, STATUS.NOT_FOUND);
      return;
    }
    const updatedPrizeScheme = await prisma.prizeScheme.update({
      where: { idPrizeScheme: validatedParams.id },
      data: {
        prizeName: validatedData.prizeName,
        prizeSchemeItems: {
          deleteMany: {},
          createMany: {
            data: validatedData.prizeSchemeItems.map((distribution) => ({
              fromPosition: distribution.fromPosition,
              toPosition: distribution.toPosition,
              prizeValue: distribution.prizeValue,
            })) || [],
          },
        },
      },
    });
    sendSuccess(
      res,
      updatedPrizeScheme,
      "Prize scheme updated successfully",
      STATUS.OK
    );
  } catch (error) {
    console.error("Error updating prize scheme:", error);
    sendError(
      res,
      "Failed to update prize scheme",
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
    const prizeScheme = await prisma.prizeScheme.findUnique({
      where: { idPrizeScheme: validatedParams.id, creatorId: req.user.id },
      select: { idPrizeScheme: true },
    });
    if (!prizeScheme) {
      sendError(res, "Prize scheme not found", {}, STATUS.NOT_FOUND);
      return;
    }
    const events = await prisma.events.findMany({
      where: {
        OR: [
          { idHotSpot1PrizeScheme: validatedParams.id },
          { idHotSpot2PrizeScheme: validatedParams.id },
          { idHotSpot3PrizeScheme: validatedParams.id },
          { idFinalPrizeScheme: validatedParams.id },
          { idHotSpotAvgPrizeScheme: validatedParams.id },
        ],
      },
      select: { idEvent: true },
    });
    if (events.length > 0) {
      sendError(
        res,
        "Cannot delete prize scheme with associated events",
        {},
        STATUS.BAD_REQUEST
      );
      return;
    }
    await prisma.prizeScheme.delete({
      where: { idPrizeScheme: validatedParams.id },
    });
    sendSuccess(res, {}, "Prize scheme deleted successfully", STATUS.OK);
  } catch (error) {
    console.error("Error deleting prize scheme:", error);
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
  createBettingSchema,
  getBettingSchemas,
  getBettingSchema,
  deleteBettingSchema,
  updateBettingSchema,
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
