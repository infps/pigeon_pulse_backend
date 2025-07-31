import type { Request, Response } from "express";
import { userLoginSchema, userSignupSchema } from "../schema/zod";
import validateSchema from "../utils/validators";
import { prisma } from "../lib/prisma";
import { sendError, sendSuccess } from "../types/api-response";
import { STATUS } from "../utils/statusCodes";
import bcrypt from "bcrypt";
import { generateJWTToken } from "../utils/jwtToken";
import { setCookie } from "../utils/cookies";
import { env } from "../env";

const breedersignup = async (req: Request, res: Response) => {
  const validatedData = validateSchema(req, res, "body", userSignupSchema);
  if (!validatedData) return;
  try {
    const userExists = await prisma.user.findUnique({
      where: { email: validatedData.email },
      select: { id: true },
    });
    if (userExists) {
      sendError(res, "User already exists", {}, STATUS.CONFLICT);
      return;
    }
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        password: hashedPassword,
        name: validatedData.name,
        role: "BREEDER",
      },
      omit: {
        password: true,
      },
    });
    const token = generateJWTToken({ userId: user.id, role: user.role });
    setCookie(res, token);
    sendSuccess(res, user, "User created successfully", STATUS.CREATED);
  } catch (error) {
    console.error("Error during signup:", error);
    sendError(res, "Internal server error", {}, STATUS.INTERNAL_SERVER_ERROR);
  }
};

const breederlogin = async (req: Request, res: Response) => {
  const validatedData = validateSchema(req, res, "body", userLoginSchema);
  if (!validatedData) return;

  try {
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
      select: {
        id: true,
        password: true,
        role: true,
        status: true,
        name: true,
        email: true,
      },
    });
    if (!user || user.role !== "BREEDER") {
      sendError(res, "Invalid Email or Password", {}, STATUS.NOT_FOUND);
      return;
    }
    const isPasswordValid = await bcrypt.compare(
      validatedData.password,
      user.password
    );
    if (!isPasswordValid) {
      sendError(res, "Invalid Email or Password", {}, STATUS.UNAUTHORIZED);
      return;
    }
    if (user.status !== "ACTIVE") {
      sendError(res, "Your account is not active", {}, STATUS.FORBIDDEN);
      return;
    }
    const token = generateJWTToken({ userId: user.id, role: user.role });
    setCookie(res, token);
    const { password, ...userData } = user;
    sendSuccess(res, userData, "Login successful", STATUS.OK);
  } catch (error) {
    console.error("Error during login:", error);
    sendError(res, "Internal server error", {}, STATUS.INTERNAL_SERVER_ERROR);
  }
};

const adminSignup = async (req: Request, res: Response) => {
  const validatedData = validateSchema(req, res, "body", userSignupSchema);
  if (!validatedData) return;
  try {
    const userExists = await prisma.user.findUnique({
      where: { email: validatedData.email },
      select: { id: true },
    });
    if (userExists) {
      sendError(res, "User already exists", {}, STATUS.CONFLICT);
      return;
    }
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        password: hashedPassword,
        name: validatedData.name,
        role: "ADMIN",
      },
      omit: {
        password: true,
      },
    });
    const token = generateJWTToken({ userId: user.id, role: user.role });
    setCookie(res, token);
    sendSuccess(res, user, "User created successfully", STATUS.CREATED);
  } catch (error) {
    console.error("Error during signup:", error);
    sendError(res, "Internal server error", {}, STATUS.INTERNAL_SERVER_ERROR);
  }
};

const adminLogin = async (req: Request, res: Response) => {
  const validatedData = validateSchema(req, res, "body", userLoginSchema);
  if (!validatedData) return;

  try {
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
      select: { id: true, password: true, role: true },
    });
    if (!user || user.role !== "ADMIN") {
      sendError(res, "Invalid Email or Password", {}, STATUS.NOT_FOUND);
      return;
    }
    const isPasswordValid = await bcrypt.compare(
      validatedData.password,
      user.password
    );
    if (!isPasswordValid) {
      sendError(res, "Invalid Email or Password", {}, STATUS.UNAUTHORIZED);
      return;
    }
    const token = generateJWTToken({ userId: user.id, role: user.role });
    setCookie(res, token);
    const { password, ...userData } = user;
    sendSuccess(res, userData, "Login successful", STATUS.OK);
  } catch (error) {
    console.error("Error during login:", error);
    sendError(res, "Internal server error", {}, STATUS.INTERNAL_SERVER_ERROR);
  }
};

const breederlogout = async (req: Request, res: Response) => {
  try {
    setCookie(res, "");
    sendSuccess(res, {}, "Logout successful", STATUS.OK);
  } catch (error) {
    console.error("Error during logout:", error);
    sendError(res, "Internal server error", {}, STATUS.INTERNAL_SERVER_ERROR);
  }
};

const adminLogout = async (req: Request, res: Response) => {
  try {
    setCookie(res, "");
    sendSuccess(res, {}, "Logout successful", STATUS.OK);
  } catch (error) {
    console.error("Error during logout:", error);
    sendError(res, "Internal server error", {}, STATUS.INTERNAL_SERVER_ERROR);
  }
};

const getSession = async (req: Request, res: Response) => {
  if (!req.user) {
    sendError(res, "Unauthorized", {}, STATUS.UNAUTHORIZED);
    return;
  }
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
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
  getSession,
  breedersignup,
  breederlogin,
  adminSignup,
  adminLogin,
  breederlogout,
  adminLogout,
};
