import type { Request, Response } from "express";
import { sendError, sendSuccess } from "../types/api-response";
import { STATUS } from "../utils/statusCodes";
import { prisma } from "../lib/prisma";
import validateSchema from "../utils/validators";
import { updateUserSchema } from "../schema/zod";
const getProfile = async (req: Request, res: Response) => {
  if (!req.user) {
    sendError(res, "Unauthorized", {}, STATUS.UNAUTHORIZED);
    return;
  }
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      omit: {
        password: true,
        createdAt: true,
        updatedAt: true,
        status: true,
        role: true,
      },
    });
    console.log("User profile retrieved:", user);
    if (!user) {
      sendError(res, "User not found", {}, STATUS.NOT_FOUND);
      return;
    }
    sendSuccess(res, user, "Profile retrieved successfully", STATUS.OK);
  } catch (error) {
    console.error("Error retrieving user profile:", error);
    sendError(
      res,
      "Failed to retrieve user profile",
      {},
      STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

const updateProfile = async (req: Request, res: Response) => {
  if (!req.user) {
    sendError(res, "Unauthorized", {}, STATUS.UNAUTHORIZED);
    return;
  }
  const validatedData = validateSchema(req, res, "body", updateUserSchema);
  if (!validatedData) {
    return;
  }
  try {
    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: validatedData,
    });
    if (!updatedUser) {
      sendError(res, "User not found", {}, STATUS.NOT_FOUND);
      return;
    }
    sendSuccess(res, updatedUser, "Profile updated successfully", STATUS.OK);
  } catch (error) {
    console.error("Error updating user profile:", error);
    sendError(
      res,
      "Failed to update user profile",
      {},
      STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

const getBreedersByEvent = async (req: Request, res: Response) => {
  if (!req.user || req.user.role !== "ADMIN") {
    sendError(res, "Unauthorized", {}, STATUS.UNAUTHORIZED);
    return;
  }
  const { eventId } = req.params;
  try {
    const breeders = await prisma.user.findMany({
      where: {
        breederEvents: {
          some: {
            eventId: eventId,
          },
        },
      },
      select: {
        name: true,
        id: true,
        email: true,
      },
    });
    sendSuccess(res, breeders, "Breeders retrieved successfully", STATUS.OK);
  } catch (error) {
    console.error("Error retrieving breeders by event:", error);
    sendError(
      res,
      "Failed to retrieve breeders by event",
      {},
      STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

const getBreedersAddressBook = async (req: Request, res: Response) => {
  if (!req.user || req.user.role !== "ADMIN") {
    sendError(res, "Unauthorized", {}, STATUS.UNAUTHORIZED);
    return;
  }
  try {
    const breeders = await prisma.user.findMany({
      where: {
        role: "BREEDER",
        breederEvents: {
          some: {
            event: {
              creator: {
                id: req.user.id,
              },
            },
          },
        },
      },
      omit: {
        password: true,
      },
    });
    sendSuccess(
      res,
      breeders,
      "Breeders address book retrieved successfully",
      STATUS.OK
    );
  } catch (error) {
    console.error("Error retrieving breeders address book:", error);
    sendError(
      res,
      "Failed to retrieve breeders address book",
      {},
      STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

export {
  getProfile,
  updateProfile,
  getBreedersByEvent,
  getBreedersAddressBook,
};
