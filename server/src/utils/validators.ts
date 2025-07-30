import z from "zod";
import type { Request, Response, NextFunction } from "express";
import { sendError } from "../types/api-response";
import { STATUS } from "./statusCodes";
const validateSchema = <T extends z.ZodTypeAny>(
  req: Request,
  res: Response,
  type: "body" | "query" | "params",
  schema: T
): z.infer<T> | undefined => {
  if (req[type] === undefined) {
    sendError(res, "Invalid request body", {}, STATUS.BAD_REQUEST);
    return;
  }
  const result = schema.safeParse(req[type]);
  if (!result.success) {
    console.error("Validation error:", result.error);
    const errors: Record<string, string> = {};
    result.error.issues.forEach((issue) => {
      errors[issue.path.join(".")] = issue.message;
    });
    sendError(res, "Validation failed", errors, STATUS.BAD_REQUEST);
    return;
  }
  return result.data;
};
export default validateSchema;