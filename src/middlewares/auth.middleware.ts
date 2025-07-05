import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../lib/auth";
import type { NextFunction, Request, Response } from "express";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  if (!session || !session.user) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  req.session = session.session;
  req.user = session.user;
  next();
}
