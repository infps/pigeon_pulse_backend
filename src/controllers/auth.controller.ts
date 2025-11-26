import type { Request, Response } from "express";
import {
  organizerLoginSchema,
  organizerSignupSchema,
  userLoginSchema,
  userSignupSchema,
} from "../schema/zod";
import validateSchema from "../utils/validators";
import { prisma } from "../lib/prisma";
import { sendError, sendSuccess } from "../types/api-response";
import { STATUS } from "../utils/statusCodes";
import bcrypt from "bcrypt";
import { generateJWTToken } from "../utils/jwtToken";
import { env } from "../env";

const breedersignup = async (req: Request, res: Response) => {
  const validatedData = validateSchema(req, res, "body", userSignupSchema);
  if (!validatedData) return;
  try {
    const userExists = await prisma.breeders.findFirst({
      where: { loginName: validatedData.email },
      select: { idBreeder: true },
    });
    const organizersExists = await prisma.organizerData.findFirst({
      where: { email: validatedData.email },
      select: { email: true },
    });
    if (userExists || organizersExists) {
      sendError(res, "User already exists", {}, STATUS.CONFLICT);
      return;
    }
    const maxNumber = await prisma.breeders.findFirst({
      orderBy: {
        number: "desc",
      },
      select: {
        number: true,
      },
    });
    const number = maxNumber && maxNumber.number ? maxNumber.number + 1 : 1;
    const user = await prisma.breeders.create({
      data: {
        number: number,
        status: 0,
        loginName: validatedData.email,
        loginPassword: validatedData.password,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
      },
      omit: {
        loginPassword: true,
      },
    });
    const token = generateJWTToken({ id: user.idBreeder });
    sendSuccess(res, { token }, "User created successfully", STATUS.CREATED);
  } catch (error) {
    console.error("Error during signup:", error);
    sendError(res, "Internal server error", {}, STATUS.INTERNAL_SERVER_ERROR);
  }
};

const breederlogin = async (req: Request, res: Response) => {
  const validatedData = validateSchema(req, res, "body", userLoginSchema);
  if (!validatedData) return;

  try {
    const user = await prisma.breeders.findFirst({
      where: { loginName: validatedData.email },
      select: {
        idBreeder: true,
        loginPassword: true,
        status: true,
        firstName: true,
        lastName: true,
        loginName: true,
      },
    });
    if (!user) {
      sendError(res, "Invalid Email or Password", {}, STATUS.UNAUTHORIZED);
      return;
    }
    if (user.loginPassword !== validatedData.password) {
      sendError(res, "Invalid Email or Password", {}, STATUS.UNAUTHORIZED);
      return;
    }
    if (user.status != 0) {
      sendError(res, "Your account is not active", {}, STATUS.FORBIDDEN);
      return;
    }
    const token = generateJWTToken({ id: user.idBreeder });
    const { loginPassword, ...userData } = user;
    sendSuccess(res, { token }, "Login successful", STATUS.OK);
  } catch (error) {
    console.error("Error during login:", error);
    sendError(res, "Internal server error", {}, STATUS.INTERNAL_SERVER_ERROR);
  }
};

const adminSignup = async (req: Request, res: Response) => {
  const validatedData = validateSchema(req, res, "body", organizerSignupSchema);
  if (!validatedData) return;
  try {
    const userExists = await prisma.organizerData.findFirst({
      where: { email: validatedData.email },
      select: { email: true },
    });
    if (userExists) {
      sendError(res, "User already exists", {}, STATUS.CONFLICT);
      return;
    }
    const user = await prisma.organizerData.create({
      data: {
        email: validatedData.email,
        password: validatedData.password,
        name: validatedData.name,
      },
      omit: {
        password: true,
      },
    });
    const token = generateJWTToken({ id: user.id });
    sendSuccess(res, { token }, "User created successfully", STATUS.CREATED);
  } catch (error) {
    console.error("Error during signup:", error);
    sendError(res, "Internal server error", {}, STATUS.INTERNAL_SERVER_ERROR);
  }
};

const adminLogin = async (req: Request, res: Response) => {
  const validatedData = validateSchema(req, res, "body", organizerLoginSchema);
  if (!validatedData) return;

  try {
    const user = await prisma.organizerData.findFirst({
      where: { email: validatedData.email },
      select: { email: true, password: true, id: true },
    });
    if (!user) {
      sendError(res, "Invalid Email or Password", {}, STATUS.UNAUTHORIZED);
      return;
    }

    if (user.password !== validatedData.password) {
      sendError(res, "Invalid Email or Password", {}, STATUS.UNAUTHORIZED);
      return;
    }
    const token = generateJWTToken({ id: user.id });
    const { password, ...userData } = user;
    sendSuccess(res, { token }, "Login successful", STATUS.OK);
  } catch (error) {
    console.error("Error during login:", error);
    sendError(res, "Internal server error", {}, STATUS.INTERNAL_SERVER_ERROR);
  }
};

const breederlogout = async (req: Request, res: Response) => {
  try {
    sendSuccess(res, {}, "Logout successful", STATUS.OK);
  } catch (error) {
    console.error("Error during logout:", error);
    sendError(res, "Internal server error", {}, STATUS.INTERNAL_SERVER_ERROR);
  }
};

const adminLogout = async (req: Request, res: Response) => {
  try {
    sendSuccess(res, {}, "Logout successful", STATUS.OK);
  } catch (error) {
    console.error("Error during logout:", error);
    sendError(res, "Internal server error", {}, STATUS.INTERNAL_SERVER_ERROR);
  }
};

const getBreederSession = async (req: Request, res: Response) => {
  if (!req.user) {
    sendError(res, "Unauthorized", {}, STATUS.UNAUTHORIZED);
    return;
  }
  try {
    const user = await prisma.breeders.findUnique({
      where: { idBreeder: req.user.id },
      select: {
        idBreeder: true,
        firstName: true,
        lastName: true,
        email: true,
        status: true,
      },
    });
    if (!user) {
      sendError(res, "Unauthorized", {}, STATUS.UNAUTHORIZED);
      return;
    }

    //transform user to include name as firstName + lastName and remove firstName and lastName fields
    const transformedUser = {
      idBreeder: user.idBreeder,
      name: `${user.firstName} ${user.lastName}`.trim(),
      email: user.email,
      status: user.status,
    };
    sendSuccess(
      res,
      transformedUser,
      "Session retrieved successfully",
      STATUS.OK
    );
  } catch (error) {
    console.error("Error retrieving session:", error);
    sendError(res, "Internal server error", {}, STATUS.INTERNAL_SERVER_ERROR);
  }
};

const getAdminSession = async (req: Request, res: Response) => {
  if (!req.user) {
    sendError(res, "Unauthorized", {}, STATUS.UNAUTHORIZED);
    return;
  }
  try {
    const user = await prisma.organizerData.findUnique({
      where: { id: req.user.id },
      select: {
        name: true,
        email: true,
      },
    });
    if (!user) {
      sendError(res, "Unauthorized", {}, STATUS.UNAUTHORIZED);
      return;
    }
    sendSuccess(res, user, "Session retrieved successfully", STATUS.OK);
  } catch (error) {
    console.error("Error retrieving session:", error);
    sendError(res, "Internal server error", {}, STATUS.INTERNAL_SERVER_ERROR);
  }
};

export {
  getBreederSession,
  getAdminSession,
  breedersignup,
  breederlogin,
  adminSignup,
  adminLogin,
  breederlogout,
  adminLogout,
};
