import { z } from "zod";

const userSignupSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const userLoginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const organizerSignupSchema = z.object({
  firstName: z.string().min(1, "Name is required"),
  lastName: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const organizerLoginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const feeSchemaCreate = z.object({
  name: z.string().min(1, "Fee name is required"),
  entryFee: z.number().min(0, "Entry fee must be a non-negative number"),
  isRefundable: z.boolean().default(false),
  minEntryFees: z
    .number()
    .int()
    .min(0, "Minimum entry fees must be a non-negative integer"),
  maxBirdCount: z
    .number()
    .int()
    .min(0, "Maximum number of birds must be at least 0"),
  maxBackupBirdCount: z
    .number()
    .int()
    .min(0, "Maximum number of backup birds must be at least 0"),
  isFloatingBackup: z.boolean().default(false),
  feesCutPercent: z
    .number()
    .min(0, "Fees cut percent must be a non-negative number")
    .max(100, "Fees cut percent cannot exceed 100"),
  hotSpot1Fee: z
    .number()
    .min(0, "Hot spot 1 fee must be a non-negative number"),
  hotSpot2Fee: z
    .number()
    .min(0, "Hot spot 2 fee must be a non-negative number"),
  hotSpot3Fee: z
    .number()
    .min(0, "Hot spot 3 fee must be a non-negative number"),
  hotSpotFinalFee: z
    .number()
    .min(0, "Hot spot final fee must be a non-negative number"),
});

const createBettingSchemaBody = z.object({
  name: z.string().min(1, "Betting name is required"),
  bettingCutPercent: z
    .number()
    .min(0, "Betting cut percent must be a non-negative number")
    .max(100, "Betting cut percent cannot exceed 100"),
  belgianShow1: z
    .number()
    .min(0, "Belgian Show 1 must be a non-negative number")
    .max(100, "Belgian Show 1 cannot exceed 100")
    .optional(),
  belgianShow2: z
    .number()
    .min(0, "Belgian Show 2 must be a non-negative number")
    .max(100, "Belgian Show 2 cannot exceed 100")
    .optional(),
  belgianShow3: z
    .number()
    .min(0, "Belgian Show 3 must be a non-negative number")
    .max(100, "Belgian Show 3 cannot exceed 100")
    .optional(),
  belgianShow4: z
    .number()
    .min(0, "Belgian Show 4 must be a non-negative number")
    .max(100, "Belgian Show 4 cannot exceed 100")
    .optional(),
  belgianShow5: z
    .number()
    .min(0, "Belgian Show 5 must be a non-negative number")
    .max(100, "Belgian Show 5 cannot exceed 100")
    .optional(),
  belgianShow6: z
    .number()
    .min(0, "Belgian Show 6 must be a non-negative number")
    .max(100, "Belgian Show 6 cannot exceed 100")
    .optional(),
  belgianShow7: z
    .number()
    .min(0, "Belgian Show 7 must be a non-negative number")
    .max(100, "Belgian Show 7 cannot exceed 100")
    .optional(),
  standardShow1: z
    .number()
    .min(0, "Standard Show 1 must be a non-negative number")
    .max(100, "Standard Show 1 cannot exceed 100")
    .optional(),
  standardShow2: z
    .number()
    .min(0, "Standard Show 2 must be a non-negative number")
    .max(100, "Standard Show 2 cannot exceed 100")
    .optional(),
  standardShow3: z
    .number()
    .min(0, "Standard Show 3 must be a non-negative number")
    .max(100, "Standard Show 3 cannot exceed 100")
    .optional(),
  standardShow4: z
    .number()
    .min(0, "Standard Show 4 must be a non-negative number")
    .max(100, "Standard Show 4 cannot exceed 100")
    .optional(),
  standardShow5: z
    .number()
    .min(0, "Standard Show 5 must be a non-negative number")
    .max(100, "Standard Show 5 cannot exceed 100")
    .optional(),
  standardShow6: z
    .number()
    .min(0, "Standard Show 6 must be a non-negative number")
    .max(100, "Standard Show 6 cannot exceed 100")
    .optional(),
  wta1: z
    .number()
    .min(0, "WTA 1 must be a non-negative number")
    .max(100, "WTA 1 cannot exceed 100")
    .optional(),
  wta2: z
    .number()
    .min(0, "WTA 2 must be a non-negative number")
    .max(100, "WTA 2 cannot exceed 100")
    .optional(),
  wta3: z
    .number()
    .min(0, "WTA 3 must be a non-negative number")
    .max(100, "WTA 3 cannot exceed 100")
    .optional(),
  wta4: z
    .number()
    .min(0, "WTA 4 must be a non-negative number")
    .max(100, "WTA 4 cannot exceed 100")
    .optional(),
  wta5: z
    .number()
    .min(0, "WTA 5 must be a non-negative number")
    .max(100, "WTA 5 cannot exceed 100")
    .optional(),

  standardShowPercentages: z.array(
    z.object({
      place: z.number().int().min(1, "Place must be at least 1"),
      percValue: z
        .number()
        .min(0, "Percentage value must be a non-negative number")
        .max(100, "Percentage value cannot exceed 100"),
    })
  ),
});

const createPrizeSchemaBody = z.object({
  name: z.string().min(1, "Prize name is required"),
  distributions: z.array(
    z.object({
      fromPosition: z.number().int().min(1, "From position must be at least 1"),
      toPosition: z.number().int().min(1, "To position must be at least 1"),
      prizeValue: z
        .number()
        .min(0, "Prize value must be a non-negative number")
        .max(100, "Prize value cannot exceed 100"),
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
  shortName: z.string().min(1, "Short name is required"),
  date: z.coerce.date(),
  type: z.enum(["AGN", "AS"]),
  isOpen: z.boolean().default(true),
  trainingFrom: z
    .number()
    .int()
    .min(0, "Training from must be a non-negative integer"),
  trainingTo: z
    .number()
    .int()
    .min(0, "Training to must be a non-negative integer"),
  inventoryFrom: z
    .number()
    .int()
    .min(0, "Inventory from must be a non-negative integer"),
  inventoryTo: z
    .number()
    .int()
    .min(0, "Inventory to must be a non-negative integer"),
  finalFrom: z.number().int().min(0, "Final to must be a non-negative integer"),
  finalTo: z.number().int().min(0, "Final to must be a non-negative integer"),
  hotspotFrom: z
    .number()
    .int()
    .min(0, "Hotspot from must be a non-negative integer"),
  hotspotTo: z
    .number()
    .int()
    .min(0, "Hotspot to must be a non-negative integer"),
  feeSchemaId: z.uuid("Invalid fee schema ID format"),
  finalRacePrizeSchemaId: z.uuid("Invalid prize schema ID format"),
  hotspot1PrizeSchemaId: z.uuid("Invalid prize schema ID format"),
  hotspot2PrizeSchemaId: z.uuid("Invalid prize schema ID format"),
  hotspot3PrizeSchemaId: z.uuid("Invalid prize schema ID format"),
  avgWinnerPrizeSchemaId: z.uuid("Invalid prize schema ID format"),
  bettingSchemaId: z.uuid("Invalid betting schema ID format").optional(),
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
  isOpen:z.boolean().optional(),
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
  createBettingSchemaBody,
  organizerSignupSchema,
  organizerLoginSchema,
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
