import { Router } from "express";
import {
  createFeeSchema,
  createPrizeSchema,
  deleteFeeSchema,
  deletePrizeSchema,
  getFeeSchema,
  getFeeSchemas,
  getPrizeSchema,
  getPrizeSchemas,
  updateFeeSchema,
  updatePrizeSchema,
  createBettingSchema,
  getBettingSchemas,
  getBettingSchema,
  updateBettingSchema,
  deleteBettingSchema,
} from "../controllers/schema.controller";
import { requireRole } from "../middlewares/auth.middleware";

const schemaRouter = Router();

schemaRouter.get("/prizes", requireRole(["ADMIN"]), getPrizeSchemas);
schemaRouter.get("/prizes/:id", requireRole(["ADMIN"]), getPrizeSchema);
schemaRouter.post(
  "/prizes",
  requireRole(["SUPER_ADMIN", "ADMIN"]),
  createPrizeSchema
);
schemaRouter.put(
  "/prizes/:id",
  requireRole(["SUPER_ADMIN", "ADMIN"]),
  updatePrizeSchema
);
schemaRouter.delete(
  "/prizes/:id",
  requireRole(["SUPER_ADMIN", "ADMIN"]),
  deletePrizeSchema
);

schemaRouter.get("/fees", requireRole(["ADMIN"]), getFeeSchemas);
schemaRouter.get("/fees/:id", requireRole(["ADMIN"]), getFeeSchema);
schemaRouter.post(
  "/fees",
  requireRole(["SUPER_ADMIN", "ADMIN"]),
  createFeeSchema
);
schemaRouter.put(
  "/fees/:id",
  requireRole(["SUPER_ADMIN", "ADMIN"]),
  updateFeeSchema
);
schemaRouter.delete(
  "/fees/:id",
  requireRole(["SUPER_ADMIN", "ADMIN"]),
  deleteFeeSchema
);

schemaRouter.get("/bettings", requireRole(["ADMIN"]), getBettingSchemas);
schemaRouter.get("/bettings/:id", requireRole(["ADMIN"]), getBettingSchema);
schemaRouter.post(
  "/bettings",
  requireRole(["SUPER_ADMIN", "ADMIN"]),
  createBettingSchema
);
schemaRouter.put(
  "/bettings/:id",
  requireRole(["SUPER_ADMIN", "ADMIN"]),
  updateBettingSchema
);
schemaRouter.delete(
  "/bettings/:id",
  requireRole(["SUPER_ADMIN", "ADMIN"]),
  deleteBettingSchema
);

export default schemaRouter;
