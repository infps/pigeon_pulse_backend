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

const updateBreederByAdmin = async (req: Request, res: Response) => {
  if (!req.user) {
    sendError(res, "Unauthorized", {}, STATUS.UNAUTHORIZED);
    return;
  }
  const { breederId } = req.params;
  if (!breederId || isNaN(parseInt(breederId, 10))) {
    sendError(res, "Invalid breederId parameter", {}, STATUS.BAD_REQUEST);
    return;
  }
  const validatedData = validateSchema(req, res, "body", updateUserSchema);
  if (!validatedData) {
    return;
  }
  try {
    const updatedUser = await prisma.breeders.update({
      where: { idBreeder: parseInt(breederId, 10) },
      data: validatedData,
    });
    if (!updatedUser) {
      sendError(res, "Breeder not found", {}, STATUS.NOT_FOUND);
      return;
    }
    sendSuccess(
      res,
      updatedUser,
      "Breeder profile updated successfully",
      STATUS.OK
    );
  } catch (error) {
    console.error("Error updating breeder profile:", error);
    sendError(
      res,
      "Failed to update breeder profile",
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

const getBreederById = async (req: Request, res: Response) => {
  if (!req.user) {
    sendError(res, "Unauthorized", {}, STATUS.UNAUTHORIZED);
    return;
  }
  const { breederId } = req.params;
  if (!breederId || isNaN(parseInt(breederId, 10))) {
    sendError(res, "Invalid breederId parameter", {}, STATUS.BAD_REQUEST);
    return;
  }
  try {
    const breeder = await prisma.breeders.findUnique({
      where: { idBreeder: parseInt(breederId, 10) },
    });
    if (!breeder) {
      sendError(res, "Breeder not found", {}, STATUS.NOT_FOUND);
      return;
    }
    sendSuccess(res, breeder, "Breeder retrieved successfully", STATUS.OK);
  } catch (error) {
    console.error("Error retrieving breeder:", error);
    sendError(
      res,
      "Failed to retrieve breeder",
      {},
      STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

const createBreeder = async (req: Request, res: Response) => {
  if (!req.user) {
    sendError(res, "Unauthorized", {}, STATUS.UNAUTHORIZED);
    return;
  }
  const validatedData = validateSchema(req, res, "body", updateUserSchema);
  if (!validatedData) {
    return;
  }
  try {
    const maxNumber = await prisma.breeders.findFirst({
      orderBy: {
        number: "desc",
      },
      select: {
        number: true,
      },
    });
    const number = maxNumber && maxNumber.number ? maxNumber.number + 1 : 1;
    const newBreeder = await prisma.breeders.create({
      data: {
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        country: validatedData.country,
        address1: validatedData.address1,
        city1: validatedData.city1,
        state1: validatedData.state1,
        zip1: validatedData.zip1,
        address2: validatedData.address2,
        city2: validatedData.city2,
        state2: validatedData.state2,
        zip2: validatedData.zip2,
        phone: validatedData.phone,
        cell: validatedData.cell,
        fax: validatedData.fax,
        email: validatedData.email,
        email2: validatedData.email2,
        webAddress: validatedData.webAddress,
        socialSecurityNumber: validatedData.socialSecurityNumber,
        status: validatedData.status,
        statusDate: validatedData.statusDate,
        note: validatedData.note,
        loginName: validatedData.loginName,
        loginPassword: validatedData.loginPassword,
        sms: validatedData.sms,
        taxNumber: validatedData.taxNumber,
        defNameAgn: validatedData.defNameAgn,
        defNameAs: validatedData.defNameAs,
        isDefaultAddress1: validatedData.isDefaultAddress1,
        number: number,
      },
    });
    sendSuccess(
      res,
      newBreeder,
      "Breeder created successfully",
      STATUS.CREATED
    );
  } catch (error) {
    console.error("Error creating breeder:", error);
    sendError(
      res,
      "Failed to create breeder",
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
  const { q, eventId, status, searchField } = req.query;

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
  if (searchField && typeof searchField !== "string") {
    sendError(res, "Invalid searchField parameter", {}, STATUS.BAD_REQUEST);
    return;
  }
  const eventIdNumber = eventId ? parseInt(eventId, 10) : undefined;
  const statusNumber = status ? parseInt(status, 10) : undefined;
  const field = searchField || "idBreeder";
  
  try {
    // Build the where clause based on searchField
    let searchCondition: any = {};
    
    if (q) {
      switch (field) {
        case "idBreeder":
          const parsedId = parseInt(q, 10);
          if (!isNaN(parsedId)) {
            searchCondition.idBreeder = parsedId;
          }
          break;
        case "firstName":
          searchCondition.firstName = { contains: q, mode: "insensitive" };
          break;
        case "lastName":
          searchCondition.lastName = { contains: q, mode: "insensitive" };
          break;
        case "address":
          searchCondition.OR = [
            { address1: { contains: q, mode: "insensitive" } },
            { address2: { contains: q, mode: "insensitive" } },
          ];
          break;
        case "city":
          searchCondition.OR = [
            { city1: { contains: q, mode: "insensitive" } },
            { city2: { contains: q, mode: "insensitive" } },
          ];
          break;
        case "state":
          searchCondition.OR = [
            { state1: { contains: q, mode: "insensitive" } },
            { state2: { contains: q, mode: "insensitive" } },
          ];
          break;
        case "zip":
          searchCondition.OR = [
            { zip1: { contains: q, mode: "insensitive" } },
            { zip2: { contains: q, mode: "insensitive" } },
          ];
          break;
        case "country":
          searchCondition.country = { contains: q, mode: "insensitive" };
          break;
        case "phone":
          searchCondition.phone = { contains: q, mode: "insensitive" };
          break;
        case "cell":
          searchCondition.cell = { contains: q, mode: "insensitive" };
          break;
        case "email":
          searchCondition.OR = [
            { email: { contains: q, mode: "insensitive" } },
            { email2: { contains: q, mode: "insensitive" } },
          ];
          break;
        default:
          searchCondition.idBreeder = !isNaN(parseInt(q, 10)) ? parseInt(q, 10) : undefined;
      }
    }
    console.log("Search Condition:", searchCondition);

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
        ...searchCondition,
      },
      orderBy:{
        idBreeder: 'asc'
      }
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

const createTeam = async (req: Request, res: Response) => {
  if (!req.user) {
    sendError(res, "Unauthorized", {}, STATUS.UNAUTHORIZED);
    return;
  }
  const { teamName,breederId } = req.body;
  if (!teamName || typeof teamName !== "string") {
    sendError(res, "Invalid teamName parameter", {}, STATUS.BAD_REQUEST);
    return;
  }
  if (!breederId || typeof breederId !== "number") {
    sendError(res, "Invalid breederId parameter", {}, STATUS.BAD_REQUEST);
    return;
  }
  try {
    const teamExists = await prisma.team.findUnique({
      where:{
        teamName_idBreeder:{
          teamName,
          idBreeder: breederId
        }
      }
    })
    if(teamExists){
      sendError(res, "Team with this name already exists", {}, STATUS.BAD_REQUEST);
      return;
    }
    const newTeam = await prisma.team.create({
      data: {
        teamName,
        idBreeder: breederId
      },
    });
    sendSuccess(res, newTeam, "Team created successfully", STATUS.CREATED);
  } catch (error) {
    console.error("Error creating team:", error);
    sendError(
      res,
      "Failed to create team",
      {},
      STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

const getBreederTeams = async (req: Request, res: Response) => {
  if (!req.user) {
    sendError(res, "Unauthorized", {}, STATUS.UNAUTHORIZED);
    return;
  }
  const breederId = req.params.breederId;
  if (!breederId || isNaN(parseInt(breederId, 10))) {
    sendError(res, "Invalid breederId parameter", {}, STATUS.BAD_REQUEST);
    return;
  }
  const breederIdNumber = parseInt(breederId, 10);
  try {
    const teams = await prisma.team.findMany({
      where: {
        idBreeder: breederIdNumber,
      },
    });
    sendSuccess(res, teams, "Teams retrieved successfully", STATUS.OK);
  } catch (error) {
    console.error("Error retrieving teams:", error);
    sendError(
      res,
      "Failed to retrieve teams",
      {},
      STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

const deleteTeam = async (req: Request, res: Response) => {
  if (!req.user) {
    sendError(res, "Unauthorized", {}, STATUS.UNAUTHORIZED);
    return;
  }
  const { teamId } = req.params;
  if (!teamId || isNaN(parseInt(teamId, 10))) {
    sendError(res, "Invalid teamId parameter", {}, STATUS.BAD_REQUEST);
    return;
  }
  try {
    const deletedTeam = await prisma.team.delete({
      where: { idTeam: parseInt(teamId, 10) },
    });
    sendSuccess(res, deletedTeam, "Team deleted successfully", STATUS.OK);
  } catch (error) {
    console.error("Error deleting team:", error);
    sendError(
      res,
      "Failed to delete team",
      {},
      STATUS.INTERNAL_SERVER_ERROR
    );
  }
}

const updateTeam = async (req: Request, res: Response) => {
  if (!req.user) {
    sendError(res, "Unauthorized", {}, STATUS.UNAUTHORIZED);
    return;
  }
  const { teamId } = req.params;
  const { teamName } = req.body;
  if (!teamId || isNaN(parseInt(teamId, 10))) {
    sendError(res, "Invalid teamId parameter", {}, STATUS.BAD_REQUEST);
    return;
  }
  if (!teamName || typeof teamName !== "string") {
    sendError(res, "Invalid teamName parameter", {}, STATUS.BAD_REQUEST);
    return;
  }
  try {
    const updatedTeam = await prisma.team.update({
      where: { idTeam: parseInt(teamId, 10) },
      data: { teamName },
    });
    sendSuccess(res, updatedTeam, "Team updated successfully", STATUS.OK);
  } catch (error) {
    console.error("Error updating team:", error);
    sendError(
      res,
      "Failed to update team",
      {},
      STATUS.INTERNAL_SERVER_ERROR
    );
  }
}

export {
  getBreederProfile,
  updateBreederProfile,
  getAdminProfile,
  getBreedersByEvent,
  getBreedersAddressBook,
  updateBreederByAdmin,
  getBreederById,
  createBreeder,
  createTeam,
  getBreederTeams,
  deleteTeam,
  updateTeam,
};
