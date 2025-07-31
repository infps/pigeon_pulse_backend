import type { Response } from "express";
import { env } from "../env";
const setCookie = (
  res: Response,
  accessToken: string,
  domain: string = "localhost"
) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    domain: domain,
  });
};

const clearCookie = (res: Response, domain: string) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
    domain: domain,
  });
};

export { setCookie, clearCookie };
