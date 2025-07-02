import { z } from "zod";

export const createRaceBody = z.object({
  name: z.string().min(1, "Name is required"),
  date: z.preprocess((date) => {
    if (typeof date === "string" && !isNaN(Date.parse(date))) {
      return new Date(date);
    }
    return null;
  }, z.date()),
  startTime: z.preprocess((time) => {
    if (typeof time === "string" && !isNaN(Date.parse(time))) {
      return new Date(time);
    }
    return null;
  }, z.date()),
  distanceKm: z.preprocess((distance) => {
    if (typeof distance === "string") {
      const num = parseFloat(distance);
      if (!isNaN(num) && num > 0) {
        return num;
      }
    }
    return null;
  }, z.number().positive()),
  startLocation: z.string().min(1, "Start location is required"),
  endLocation: z.string().min(1, "End location is required"),
  entryFee: z.preprocess((fee) => {
    if (typeof fee === "string") {
      const num = parseFloat(fee);
      if (!isNaN(num) && num >= 0) {
        return num;
      }
    }
    return null;
  }, z.number().nonnegative()),
  maxParticipants: z.preprocess((max) => {
    if (typeof max === "string") {
      const num = parseInt(max, 10);
      if (!isNaN(num) && num > 0) {
        return num;
      }
    }
    return null;
  }, z.number().int().positive()),
  status: z.enum(["UPCOMING", "LIVE", "COMPLETED"], {
    message: "Status must be one of UPCOMING, LIVE, or COMPLETED",
  }),
  rules: z.string(),
  description: z.string(),
});

export const updateRaceParams = z.object({
  id: z.string().uuid(),
});

export const updateRaceBody = z.object({
  name: z.string().optional(),
  date: z.preprocess((date) => {
    if (typeof date === "string" && !isNaN(Date.parse(date))) {
      return new Date(date);
    }
    return undefined;
  }, z.date().optional()),
  startTime: z.preprocess((time) => {
    if (typeof time === "string" && !isNaN(Date.parse(time))) {
      return new Date(time);
    }
    return undefined;
  }, z.date().optional()),
  distanceKm: z.preprocess((distance) => {
    if (typeof distance === "string") {
      const num = parseFloat(distance);
      if (!isNaN(num) && num > 0) {
        return num;
      }
    }
    return undefined;
  }, z.number().positive().optional()),
  startLocation: z.string().optional(),
  endLocation: z.string().optional(),
  entryFee: z.preprocess((fee) => {
    if (typeof fee === "string") {
      const num = parseFloat(fee);
      if (!isNaN(num) && num >= 0) {
        return num;
      }
    }
    return undefined;
  }, z.number().nonnegative().optional()),
  maxParticipants: z.preprocess((max) => {
    if (typeof max === "string") {
      const num = parseInt(max, 10);
      if (!isNaN(num) && num > 0) {
        return num;
      }
    }
    return undefined;
  }, z.number().int().positive().optional()),
  status: z.enum(["UPCOMING", "LIVE", "COMPLETED"]).optional(),
  rules: z.string().optional(),
  description: z.string().optional(),
});

export const getUserByIdParams = z.object({
  id: z.string().uuid(),
});
