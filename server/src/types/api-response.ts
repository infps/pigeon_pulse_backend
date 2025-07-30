import type { Response } from "express";
export interface ApiSuccessResponse<T = any> {
  success: true;
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: any;
}

export type ApiResponse<T = any> = ApiSuccessResponse<T> | ApiErrorResponse;

export const sendSuccess = <T>(
  res: Response,
  data: T,
  message = "Success",
  statusCode = 200
) => {
  const response: ApiSuccessResponse<T> = {
    success: true,
    message,
    data,
  };
  return res.status(statusCode).json(response);
};

export const sendError = (
  res: Response,
  message: string,
  errors?: Record<string, string>,
  statusCode = 400
) => {
  const response: ApiErrorResponse = {
    success: false,
    message,
    errors,
  };
  return res.status(statusCode).json(response);
};