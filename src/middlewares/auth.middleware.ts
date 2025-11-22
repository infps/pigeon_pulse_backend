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
      if (!decoded || !decoded.id) {
        return sendError(res, "Forbidden", {}, STATUS.FORBIDDEN);
      }
      let user;
      if (allowedRoles.length === 1 && allowedRoles[0] === "BREEDER") {
        user = await prisma.breeders.findUnique({
          where: { idBreeder: decoded.id },
          select: {
            idBreeder: true,
            email: true,
          },
        });
      } else if (
        allowedRoles.length === 1 &&
        (allowedRoles[0] === "ADMIN" || allowedRoles[0] === "SUPER_ADMIN")
      ) {
        user = await prisma.organizerData.findUnique({
          where: { id: decoded.id },
          select: { id: true, email: true },
        });
      } else {
        user = await prisma.breeders.findUnique({
          where: { idBreeder: decoded.id },
          select: {
            idBreeder: true,
            email: true,
          },
        });
        if (!user) {
          user = await prisma.organizerData.findUnique({
            where: { id: decoded.id },
            select: { id: true, email: true },
          });
        }
      }
      if (!user) {
        return sendError(res, "Unauthorized", {}, STATUS.UNAUTHORIZED);
      }
      let transformedUser = {
        id: (user as any).id || (user as any).idBreeder,
        email: user.email,
      };
      req.user = transformedUser;
      next();
    } catch (error) {
      console.error("Authentication error:", error);
      sendError(res, "Unauthorized", {}, STATUS.UNAUTHORIZED);
    }
  };
};
