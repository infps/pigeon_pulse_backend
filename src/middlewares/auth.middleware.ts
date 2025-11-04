import type { Request, Response, NextFunction } from "express";
import { sendError } from "../types/api-response";
import { STATUS } from "../utils/statusCodes";
import { verifyToken } from "../utils/jwtToken";
import { prisma } from "../lib/prisma";
import type { JWTPayload, Role } from "../types/types";

export const requireRole = (allowedRoles: Role[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token =
      req.headers.authorization?.split(" ")[1] || req.cookies.accessToken;
    if (!token) {
      sendError(res, "Unauthorized", {}, STATUS.UNAUTHORIZED);
      return;
    }
    try {
      const decoded: JWTPayload = verifyToken(token);
      if (!decoded || !decoded.userId) {
        return sendError(res, "Forbidden", {}, STATUS.FORBIDDEN);
      }
      let user;
      if (allowedRoles.length === 1 && allowedRoles[0] === "BREEDER") {
        user = await prisma.user.findUnique({
          where: { id: decoded.userId },
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            status: true,
          },
        });
      } else if (
        allowedRoles.length === 1 &&
        (allowedRoles[0] === "ADMIN" || allowedRoles[0] === "SUPER_ADMIN")
      ) {
        user = await prisma.organizerData.findUnique({
          where: { id: decoded.userId },
          select: { id: true, email: true, firstName: true,lastName: true,status: true },
        });
      } else {
        user = await prisma.user.findUnique({
          where: { id: decoded.userId },
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            status: true,
          },
        });
        if (!user) {
          user = await prisma.organizerData.findUnique({
            where: { id: decoded.userId },
            select: { id: true, email: true, firstName: true, lastName: true, status: true },
          });
        }
      }
      if (!user || user.status !== "ACTIVE") {
        return sendError(res, "Unauthorized", {}, STATUS.UNAUTHORIZED);
      }
      req.user = user;
      next();
    } catch (error) {
      console.error("Authentication error:", error);
      sendError(res, "Unauthorized", {}, STATUS.UNAUTHORIZED);
    }
  };
};
