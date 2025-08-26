import { Router } from "express";
import { requireRole } from "../middlewares/auth.middleware";
import {
  capturePayment,
  getMyPayments,
} from "../controllers/payments.controller";

const paymentRouter = Router();

paymentRouter.post("/capture", requireRole(["BREEDER"]), capturePayment);
paymentRouter.get("/my", requireRole(["BREEDER"]), getMyPayments);

export default paymentRouter;
