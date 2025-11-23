import type { Request, Response } from "express";
import { sendError, sendSuccess } from "../types/api-response";
import { STATUS } from "../utils/statusCodes";
import { prisma } from "../lib/prisma";
import validateSchema from "../utils/validators";
import { updateUserSchema } from "../schema/zod";
import { number } from "zod";
const getBreederProfile = async (req: Request, res: Response) => {
  if (!req.user) {
    sendError(res, "Unauthorized", {}, STATUS.UNAUTHORIZED);
    return;
  }
  try {
    const user = await prisma.breeders.findUnique({
      where: { idBreeder: req.user.id },
      omit: {
        loginPassword: true,
        status: true,
      },
    });
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

const getAdminProfile = async (req: Request, res: Response) => {
  if (!req.user) {
    sendError(res, "Unauthorized", {}, STATUS.UNAUTHORIZED);
    return;
  }
  try {
    const user = await prisma.organizerData.findUnique({
      where: { id: req.user.id },
      omit: {
        password: true,
      },
    });
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

const updateBreederProfile = async (req: Request, res: Response) => {
  if (!req.user) {
    sendError(res, "Unauthorized", {}, STATUS.UNAUTHORIZED);
    return;
  }
  const validatedData = validateSchema(req, res, "body", updateUserSchema);
  if (!validatedData) {
    return;
  }
  try {
    const updatedUser = await prisma.breeders.update({
      where: { idBreeder: req.user.id },
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
  if (!req.user) {
    sendError(res, "Unauthorized", {}, STATUS.UNAUTHORIZED);
    return;
  }
  const { eventId } = req.params;
  if (!eventId || isNaN(parseInt(eventId, 10))) {
    sendError(res, "Invalid eventId parameter", {}, STATUS.BAD_REQUEST);
    return;
  }
  try {
    const breeders = await prisma.breeders.findMany({
      where: {
        eventInventories: {
          every: {
            idEvent: parseInt(eventId, 10),
          },
        },
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
  if (!req.user) {
    sendError(res, "Unauthorized", {}, STATUS.UNAUTHORIZED);
    return;
  }
  const { q, eventId, status } = req.query;

  if (q && typeof q !== "string") {
    sendError(res, "Invalid query parameter", {}, STATUS.BAD_REQUEST);
    return;
  }
  if (eventId && typeof eventId !== "string") {
    sendError(res, "Invalid eventId parameter", {}, STATUS.BAD_REQUEST);
    return;
  }
  if (status && typeof status !== "string") {
    sendError(res, "Invalid status parameter", {}, STATUS.BAD_REQUEST);
    return;
  }
  const eventIdNumber = eventId ? parseInt(eventId, 10) : undefined;
  const statusNumber = status ? parseInt(status, 10) : undefined;
  try {
    const breeders = await prisma.breeders.findMany({
      where: {
        ...(status ? { status: statusNumber } : {}),
        ...(eventId
          ? {
              eventInventories: {
                some: {
                  idEvent: eventIdNumber,
                },
              },
            }
          : {}),
        OR: [
          {
            firstName: {
              contains: q || "",
              mode: "insensitive",
            },
          },
          {
            lastName: {
              contains: q || "",
              mode: "insensitive",
            },
          },
          {
            phone: {
              contains: q || "",
              mode: "insensitive",
            },
          },
          {
            address1: {
              contains: q || "",
              mode: "insensitive",
            },
          },
          {
            email: {
              contains: q || "",
              mode: "insensitive",
            },
          },
        ],
      },
      omit: {
        loginPassword: true,
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
  getBreederProfile,
  updateBreederProfile,
  getAdminProfile,
  getBreedersByEvent,
  getBreedersAddressBook,
};
