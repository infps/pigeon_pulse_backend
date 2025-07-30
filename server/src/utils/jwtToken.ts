import jwt from "jsonwebtoken";
import { env } from "../env";
import type { JWTPayload } from "../types/types";

const generateJWTToken = (payload: JWTPayload): string => {
  const secretKey = env.JWT_SECRET as string;
  const token = jwt.sign(payload, secretKey, {
    expiresIn: "24h",
  });
  return token;
};

const verifyToken = (token: string): JWTPayload => {
  const decoded = jwt.verify(token, env.JWT_SECRET as string);
  if (!decoded) {
    throw new Error("Invalid token");
  }
  const User = decoded as JWTPayload;
  return User;
};

export { generateJWTToken, verifyToken };
