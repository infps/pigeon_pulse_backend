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
const schemaRouter = Router();

schemaRouter.get("/prizes", getPrizeSchemas);
schemaRouter.get("/prizes/:id", getPrizeSchema);
schemaRouter.post("/prizes", createPrizeSchema);
schemaRouter.put("/prizes/:id", updatePrizeSchema);
schemaRouter.delete("/prizes/:id", deletePrizeSchema);

schemaRouter.get("/fees", getFeeSchemas);
schemaRouter.get("/fees/:id", getFeeSchema);
schemaRouter.post("/fees", createFeeSchema);
schemaRouter.put("/fees/:id", updateFeeSchema);
schemaRouter.delete("/fees/:id", deleteFeeSchema);

export default schemaRouter;
