import { Router } from "express";
import { requireRole } from "../middlewares/auth.middleware";
import {
  capturePayment,
  getMyPayments,
  createPaymentOrder,
  cancelPayment,
} from "../controllers/payments.controller";

const paymentRouter = Router();

paymentRouter.post("/capture", requireRole(["BREEDER"]), capturePayment);
paymentRouter.post("/cancel", requireRole(["BREEDER"]), cancelPayment);
paymentRouter.get("/my", requireRole(["BREEDER"]), getMyPayments);
paymentRouter.post(
  "/:id/create-order",
  requireRole(["BREEDER"]),
  createPaymentOrder
);

export default paymentRouter;
