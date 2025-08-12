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
  id: z.uuid("Invalid ID format"),
});

const queryParamsSchema = z.object({
  q: z.string().optional(),
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
  page: z.coerce
    .number()
    .int()
    .min(1, "Page must be a positive integer")
    .default(1),
  limit: z.coerce
    .number()
    .int()
    .min(1, "Limit must be a positive integer")
    .default(10),
});

const updateUserSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  country: z.string().min(1, "Country is required").optional(),
  ssn: z.string().min(1, "SSN is required").optional(),
  taxNumber: z.string().min(1, "Tax number is required").optional(),
  address: z.string().min(1, "Address is required").optional(),
  city: z.string().min(1, "City is required").optional(),
  state: z.string().min(1, "State is required").optional(),
  zip: z.string().min(1, "ZIP code is required").optional(),
  primaryPhone: z.string().min(1, "Primary phone is required").optional(),
  cellPhone: z.string().min(1, "Cell phone is required").optional(),
  fax: z.string().min(1, "Fax is required").optional(),
  sms: z.string().min(1, "SMS is required").optional(),
  alternativeEmail: z
    .string()
    .min(1, "Alternative email is required")
    .optional(),
  webAddress: z.string().min(1, "Web address is required").optional(),
});

const updateBirdSchema = z.object({
  birdName: z.string().min(1, "Bird name is required").optional(),
  color: z.string().min(1, "Color is required").optional(),
  sex: z.enum(["COCK", "HEN"]).optional(),
});

const eventsQuerySchema = z.object({
  page: z.number().int().min(1, "Page must be a positive integer").default(1),
  limit: z.coerce
    .number()
    .int()
    .min(1, "Limit must be a positive integer")
    .default(10),
  status: z.enum(["OPEN", "CLOSED"]).optional(),
});

const addBirdSchema = z.object({
  birdName: z.string().min(1, "Bird name is required"),
  color: z.string().min(1, "Color is required"),
  sex: z.enum(["COCK", "HEN"]),
});

const createOrderSchema = z.object({
  eventId: z.uuid("Invalid event ID format"),
  birds: z.array(z.string().min(1, "Bird ID is required")),
});

const paypalPaymentSchema = z.object({
  orderId: z.string().min(1, "Order ID is required"),
});

const listBirdQuery = z.object({
  q: z.string().optional(),
});

const updateEventInventoryItemSchema = z.object({
  band_1: z.string().min(1, "Band 1 is required"),
  band_2: z.string().min(1, "Band 2 is required"),
  band_3: z.string().min(1, "Band 3 is required"),
  band_4: z.string().min(1, "Band 4 is required"),
  rfId: z.string().optional(),
  color: z.string().min(1, "Color is required"),
  birdName: z.string().min(1, "Bird Name is required"),
  note: z.string().optional(),
  sex: z.enum(["HEN", "COCK"]),
  is_active: z.boolean(),
  is_lost: z.boolean(),
  lost_date: z.coerce.date().nullable(),
  arrivalDate: z.coerce.date().nullable(),
  departureDate: z.coerce.date().nullable(),
});

const createRaceSchema = z.object({
  type: z.enum([
    "TRAINING",
    "INVENTORY",
    "LOFT_FLY",
    "PULLING_FLIGHT",
    "FINAL_RACE",
    "HOTSPOT_1",
    "HOTSPOT_2",
    "HOTSPOT_3",
    "AVG_WINNER",
  ]),
  eventId: z.uuid("Invalid event ID format"),
  location: z.string().min(1, "Location is required"),
  distance: z.coerce
    .number()
    .int()
    .min(1, "Distance must be a positive integer"),
  startTime: z.coerce.date(),
  arrivalDate: z.coerce.date(),
});

export {
  userSignupSchema,
  userLoginSchema,
  feeSchemaCreate,
  idParamsSchema,
  createPrizeSchemaBody,
  createEventSchemaBody,
  paginationSchema,
  updateUserSchema,
  updateBirdSchema,
  addBirdSchema,
  eventsQuerySchema,
  createOrderSchema,
  paypalPaymentSchema,
  queryParamsSchema,
  listBirdQuery,
  createRaceSchema,
  updateEventInventoryItemSchema,
};
