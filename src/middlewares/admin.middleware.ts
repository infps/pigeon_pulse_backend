import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../lib/auth";
import type { NextFunction, Request, Response } from "express";

export async function adminMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  console.log(session);
  if (
    !session ||
    !session.user ||
    !session.user.role ||
    session.user.role !== "admin"
  ) {
    console.log("Unauthorized access attempt:");
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  req.session = session.session;
  req.user = session.user;
  next();
}
