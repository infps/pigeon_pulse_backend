import { z } from "zod";

const userSignupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const userLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const feeSchemaCreate = z.object({
  name: z.string().min(1, "Fee name is required"),
  entryFee: z.number().min(0, "Entry fee must be a non-negative number"),
  expensePercentage: z
    .number()
    .min(0, "Expense percentage must be a non-negative number")
    .max(100, "Expense percentage cannot exceed 100"),
  minEntryFee: z
    .int()
    .min(0, "Minimum entry fee must be a non-negative integer"),
  entryFeeRefundable: z.boolean().default(false),
  hs1Fee: z.number().min(0, "HS1 fee must be a non-negative number"),
  hs2Fee: z.number().min(0, "HS2 fee must be a non-negative number"),
  hs3Fee: z.number().min(0, "HS3 fee must be a non-negative number"),
  finalRaceFee: z
    .number()
    .min(0, "Final race fee must be a non-negative number"),
  maxBirds: z.int().min(0, "Maximum number of birds must be at least 0"),
  maxBackupBirds: z
    .int()
    .min(0, "Maximum number of backup birds must be at least 0"),
  floatingBackup: z.boolean().default(false),
});

const createPrizeSchemaBody = z.object({
  name: z.string().min(1, "Prize name is required"),
  distributions: z.array(
    z.object({
      fromPosition: z.number().int().min(1, "From position must be at least 1"),
      toPosition: z.number().int().min(1, "To position must be at least 1"),
      percentage: z
        .number()
        .min(0, "Percentage must be a non-negative number")
        .max(100, "Percentage cannot exceed 100"),
    })
  ),
});

const idParamsSchema = z.object({
  id: z.string().uuid("Invalid ID format"),
});

const createEventSchemaBody = z.object({
  name: z.string().min(1, "Event name is required"),
  status: z.enum(["OPEN", "CLOSED"]),
  shortName: z.string().min(1, "Short name is required"),
  date: z.coerce.date(),
  type: z.enum(["AGN", "AS"]),
  trainingCount: z
    .number()
    .int()
    .min(0, "Training count must be a non-negative integer"),
  inventoryCount: z
    .number()
    .int()
    .min(0, "Inventory count must be a non-negative integer"),
  finalRaceCount: z
    .number()
    .int()
    .min(0, "Final race count must be a non-negative integer"),
  hotspotCount: z
    .number()
    .int()
    .min(0, "Hotspot count must be a non-negative integer"),
  feeSchemaId: z.uuid("Invalid fee schema ID format"),
  finalRacePrizeSchemaId: z.uuid("Invalid prize schema ID format"),
  hotspot1PrizeSchemaId: z.uuid("Invalid prize schema ID format"),
  hotspot2PrizeSchemaId: z.uuid("Invalid prize schema ID format"),
  hotspot3PrizeSchemaId: z.uuid("Invalid prize schema ID format"),
  avgWinnerPrizeSchemaId: z.uuid("Invalid prize schema ID format"),
});

const paginationSchema = z.object({
  page: z.number().int().min(1, "Page must be a positive integer").default(1),
  limit: z
    .number()
    .int()
    .min(1, "Limit must be a positive integer")
    .default(10),
});

export {
  userSignupSchema,
  userLoginSchema,
  feeSchemaCreate,
  idParamsSchema,
  createPrizeSchemaBody,
  createEventSchemaBody,
  paginationSchema,
};
