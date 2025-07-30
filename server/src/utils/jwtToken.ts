import jwt from "jsonwebtoken";
import { env } from "../env";

const generateJWTToken = (userId: string, role: string): string => {
  const secretKey = env.JWT_SECRET as string;
  const token = jwt.sign({ userId, role }, secretKey, {
    expiresIn: "24h",
  });
  return token;
};

const verifyToken = (token: string): { userId: string; role: string } => {
  const decoded = jwt.verify(token, env.JWT_SECRET as string);
  if (!decoded) {
    throw new Error("Invalid token");
  }
  const User = decoded as { userId: string; role: string };
  return User;
};

export { generateJWTToken, verifyToken };
