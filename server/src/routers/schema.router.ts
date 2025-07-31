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
} from "../controllers/schema.controller";
import { requireRole } from "../middlewares/auth.middleware";

const schemaRouter = Router();

schemaRouter.get("/prizes", getPrizeSchemas);
schemaRouter.get("/prizes/:id", getPrizeSchema);
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

schemaRouter.get("/fees", getFeeSchemas);
schemaRouter.get("/fees/:id", getFeeSchema);
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

export default schemaRouter;
