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

export {
  userSignupSchema,
  userLoginSchema,
  feeSchemaCreate,
  idParamsSchema,
  createPrizeSchemaBody,
};
