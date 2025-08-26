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
      if (!decoded || !decoded.role || !allowedRoles.includes(decoded.role)) {
        return sendError(res, "Forbidden", {}, STATUS.FORBIDDEN);
      }
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: { id: true, role: true, email: true, name: true, status: true },
      });
      if (
        !user ||
        !allowedRoles.includes(user.role) ||
        user.status !== "ACTIVE"
      ) {
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
