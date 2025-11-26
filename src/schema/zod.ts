import { z } from "zod";

const userSignupSchema = z.object({
  firstName: z.string().min(1, "Name is required"),
  lastName: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const userLoginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const organizerSignupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const organizerLoginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const feeSchemaCreate = z
  .object({
    feeSchemeName: z.string().min(1, "Fee name is required"),
    entryFee: z.number().min(0, "Entry fee must be a non-negative number"),
    isRefundable: z.number().int().min(0).max(1),
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
    isFloatingBackup: z.number().int().min(0).max(1),
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
    perchFees: z.array(
      z.object({
        birdNo: z.number().int().min(1, "Bird number must be at least 1"),
        perchFee: z.number().min(0, "Perch fee must be a non-negative number"),
      })
    ),
  })
  .refine((data) => data.perchFees.length === data.maxBirdCount, {
    message: "Perch fees length must match max bird count",
    path: ["perchFees"], // points the error to perchFees
  });

const createBettingSchemaBody = z.object({
  bettingSchemeName: z.string().min(1, "Betting name is required"),
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
  prizeName: z.string().min(1, "Prize name is required"),
  prizeSchemeItems: z.array(
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
  id: z.coerce.number().int().min(1, "ID must be a positive integer"),
});

const queryParamsSchema = z.object({
  q: z.string().optional(),
});

const createEventSchemaBody = z.object({
  eventName: z.string().min(1, "Event name is required"),
  eventShortName: z.string().min(1, "Short name is required"),
  eventDate: z.coerce.date(),
  eventType: z.number().int(),
  isOpen: z.number().int().min(0).max(1),
  idFeeScheme:z.number().int(),
  idFinalPrizeScheme: z.int(),
  idHotSpot1PrizeScheme: z.int(),
  idHotSpot2PrizeScheme: z.int(),
  idHotSpot3PrizeScheme: z.int(),
  idHotSpotAvgPrizeScheme: z.int(),
  idBettingScheme: z.int().optional()
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
  firstName: z.string().min(1, "First Name is required").optional(),
  lastName: z.string().min(1, "Last Name is required").optional(),
  country: z.string().min(1, "Country is required").optional(),
  address1: z.string().min(1, "Address Line 1 is required").optional(),
  city1: z.string().min(1, "City is required").optional(),
  state1: z.string().min(1, "State is required").optional(),
  zip1: z.string().min(1, "ZIP Code is required").optional(),
  address2: z.string().optional(),
  city2: z.string().optional(),
  state2: z.string().optional(),
  zip2: z.string().optional(),
  phone: z.string().min(1, "Phone number is required").optional(),
  cell: z.string().optional(),
  fax: z.string().optional(),
  email: z.email("Invalid email address").optional(),
  email2: z.email("Invalid email address").optional(),
  webAddress: z.string().optional(),
  socialSecurityNumber: z.string().optional(),
  status: z.number().int().min(0).max(2).optional(),
  statusDate: z.coerce.date().optional(),
  note: z.string().optional(),
  loginName: z.string().min(1, "Login name is required").optional(),
  loginPassword: z.string().min(6, "Password must be at least 6 characters long").optional(),
  sms: z.string().optional(),
  taxNumber: z.string().optional(),
  defNameAgn: z.string().optional(),
  defNameAs: z.string().optional(),
  isDefaultAddress1: z.number().int().min(0).max(1).optional(),
});

const updateBirdSchema = z.object({
  birdName: z.string().min(1, "Bird name is required").optional(),
  color: z.string().min(1, "Color is required").optional(),
  sex: z.number().int().min(0).max(2).optional(),
});

const eventsQuerySchema = z.object({
  page: z.number().int().min(1, "Page must be a positive integer").default(1),
  limit: z.coerce
    .number()
    .int()
    .min(1, "Limit must be a positive integer")
    .default(10),
  isOpen: z.number().int().min(0).max(1).optional(),
});

const addBirdSchema = z.object({
  birdName: z.string().min(1, "Bird name is required"),
  color: z.string().min(1, "Color is required"),
  sex: z.number().int().min(0).max(2),
});

const createOrderSchema = z.object({
  eventId: z.number().int().min(0, "Event ID must be a positive integer"),
  birds: z.array(z.number().int().min(0, "Bird ID must be a positive integer")),
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
  sex: z.number().int().min(0).max(1),
  is_active: z.number().int().min(0).max(1),
  is_lost: z.number().int().min(0).max(1),
  lost_date: z.coerce.date().nullable(),
  arrivalDate: z.coerce.date().nullable(),
  departureDate: z.coerce.date().nullable(),
});

const createRaceSchema = z.object({
  type: z.number().int(),
  eventId: z.number().int().min(0, "Event ID must be a positive integer"),
  location: z.string().min(1, "Location is required"),
  description: z.string().optional(),
  distance: z.coerce
    .number()
    .int()
    .min(1, "Distance must be a positive integer"),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  sunrise: z.string(),
  sunset: z.string(),
  weather: z.string().min(1, "Weather is required"),
  wind: z.string().min(1, "Wind is required"),
  temperature: z.string().min(1, "Temperature is required"),
  arrivalWeather: z.string().min(1, "Arrival weather is required"),
  arrivalWind: z.string().min(1, "Arrival wind is required"),
  arrivalTemperature: z.string().min(1, "Arrival temperature is required"),
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
