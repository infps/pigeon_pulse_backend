import { z } from "zod";

export const createRaceBody = z.object({
  name: z.string().min(1, "Name is required"),
  date: z.preprocess((date) => {
    if (date instanceof Date) return date;
    if (typeof date === "string" && !isNaN(Date.parse(date))) {
      return new Date(date);
    }
    return null;
  }, z.date()),
  distanceKm: z.preprocess((value) => {
    if (typeof value === "string") {
      const num = parseFloat(value);
      if (!isNaN(num) && num > 0) {
        return num;
      }
    }
    return null;
  }, z.number().positive("Distance must be a positive number")),
  startLocation: z.string().min(1, "Start location is required"),
  endLocation: z.string().min(1, "End location is required"),
  entryFee: z.preprocess((value) => {
    if (typeof value === "string") {
      const num = parseFloat(value);
      if (!isNaN(num) && num >= 0) {
        return num;
      }
    }
    return null;
  }, z.number().nonnegative("Entry fee must be a non-negative number")),
  maxParticipants: z.preprocess((value) => {
    if (typeof value === "string") {
      const num = parseInt(value, 10);
      if (!isNaN(num) && num > 0) {
        return num;
      }
    }
    return null;
  }, z.number().int().positive("Max participants must be a positive integer")),
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
  name: z.string().min(1, "Name is required"),
  date: z
    .preprocess((date) => {
      if (date instanceof Date) return date;
      if (typeof date === "string" && !isNaN(Date.parse(date))) {
        return new Date(date);
      }
      return null;
    }, z.date())
    .optional(),
  distanceKm: z
    .preprocess((value) => {
      if (typeof value === "string") {
        const num = parseFloat(value);
        if (!isNaN(num) && num > 0) {
          return num;
        }
      }
      return null;
    }, z.number().positive("Distance must be a positive number"))
    .optional(),
  startLocation: z.string().min(1, "Start location is required").optional(),
  endLocation: z.string().min(1, "End location is required").optional(),
  entryFee: z
    .preprocess((value) => {
      if (typeof value === "string") {
        const num = parseFloat(value);
        if (!isNaN(num) && num >= 0) {
          return num;
        }
      }
      return null;
    }, z.number().nonnegative("Entry fee must be a non-negative number"))
    .optional(),
  maxParticipants: z
    .preprocess((value) => {
      if (typeof value === "string") {
        const num = parseInt(value, 10);
        if (!isNaN(num) && num > 0) {
          return num;
        }
      }
      return null;
    }, z.number().int().positive("Max participants must be a positive integer"))
    .optional(),
  status: z
    .enum(["UPCOMING", "LIVE", "COMPLETED"], {
      message: "Status must be one of UPCOMING, LIVE, or COMPLETED",
    })
    .optional(),
  rules: z.string().optional(),
  description: z.string().optional(),
});

export const getIdParams = z.object({
  id: z.string(),
});

export const updateUserBody = z.object({
  banned: z.boolean(),
  banReason: z.string().nullable(),
});

export const getQueryParams = z.object({
  page: z.coerce.number().int().min(1).default(1).optional(),
  search: z.string().optional(),
});

export const getRaceQueryParams = z.object({
  page: z.coerce.number().int().min(1).default(1).optional(),
  search: z.string().optional(),
  status: z.enum(["UPCOMING", "LIVE", "COMPLETED"]).optional(),
});

export const createLoftBody = z.object({
  name: z.string().min(1, "Loft name is required"),
  location: z.string().min(1, "Loft location is required"),
});

export const updateLoftBody = z.object({
  name: z.string().min(1, "Loft name is required").optional(),
  location: z.string().min(1, "Loft location is required").optional(),
});

export const createBirdBody = z.object({
  name: z.string().min(1, "Bird name is required"),
  bandNumber: z.string().min(1, "Band number is required"),
  breed: z.string().min(1, "Breed is required"),
  color: z.string().min(1, "Color is required"),
  gender: z.enum(["MALE", "FEMALE"], {
    message: "Invalid Gender",
  }),
  age: z.number().int().min(0, "Age must be a non-negative integer").optional(),
  wingspan: z
    .number()
    .positive("Wingspan must be a positive number")
    .optional(),
  vaccinationStatus: z.boolean().default(false),
  penNumber: z.string().optional(),
  raceExperience: z.number().int().optional(),
  status: z
    .enum(["ACTIVE", "MISSING", "HOSPITALIZED"], {
      message: "Status must be one of ACTIVE, INACTIVE, or RETIRED",
    })
    .default("ACTIVE"),
  rfIdTag: z.string().optional(),
});

export const updateBirdBody = z.object({
  name: z.string().min(1, "Bird name is required").optional(),
  bandNumber: z.string().min(1, "Band number is required").optional(),
  breed: z.string().min(1, "Breed is required").optional(),
  color: z.string().min(1, "Color is required").optional(),
  gender: z
    .enum(["MALE", "FEMALE"], {
      message: "Invalid Gender",
    })
    .optional(),
  age: z.number().int().min(0, "Age must be a non-negative integer").optional(),
  wingspan: z
    .number()
    .positive("Wingspan must be a positive number")
    .optional(),
  vaccinationStatus: z.boolean().default(false).optional(),
  penNumber: z.string().optional(),
  raceExperience: z.number().int().optional(),
  status: z
    .enum(["ACTIVE", "MISSING", "HOSPITALIZED"], {
      message: "Status must be one of ACTIVE, MISSING, or HOSPITALIZED",
    })
    .optional(),
  rfIdTag: z.string().optional(),
});

export const inviteToLobyParams = z.object({
  loftid: z.string(),
  userId: z.string(),
});
