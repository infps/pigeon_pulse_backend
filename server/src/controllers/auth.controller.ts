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
        role: "BREEDER",
      },
      omit: {
        password: true,
      },
    });
    const token = generateJWTToken(user.id, user.role);
    setCookie(res, token, env.BREEDER_DOMAIN);
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
      select: { id: true, password: true, role: true },
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
    const token = generateJWTToken(user.id, user.role);
    setCookie(res, token, env.BREEDER_DOMAIN);
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
        role: "ADMIN",
      },
      omit: {
        password: true,
      },
    });
    const token = generateJWTToken(user.id, user.role);
    setCookie(res, token, env.ADMIN_DOMAIN);
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
    const token = generateJWTToken(user.id, user.role);
    setCookie(res, token, env.ADMIN_DOMAIN);
    const { password, ...userData } = user;
    sendSuccess(res, userData, "Login successful", STATUS.OK);
  } catch (error) {
    console.error("Error during login:", error);
    sendError(res, "Internal server error", {}, STATUS.INTERNAL_SERVER_ERROR);
  }
};

const breederlogout = async (req: Request, res: Response) => {
  try {
    setCookie(res, "", env.BREEDER_DOMAIN);
    sendSuccess(res, {}, "Logout successful", STATUS.OK);
  } catch (error) {
    console.error("Error during logout:", error);
    sendError(res, "Internal server error", {}, STATUS.INTERNAL_SERVER_ERROR);
  }
};

const adminLogout = async (req: Request, res: Response) => {
  try {
    setCookie(res, "", env.ADMIN_DOMAIN);
    sendSuccess(res, {}, "Logout successful", STATUS.OK);
  } catch (error) {
    console.error("Error during logout:", error);
    sendError(res, "Internal server error", {}, STATUS.INTERNAL_SERVER_ERROR);
  }
};


export {
  breedersignup,
  breederlogin,
  adminSignup,
  adminLogin,
  breederlogout,
  adminLogout,
};