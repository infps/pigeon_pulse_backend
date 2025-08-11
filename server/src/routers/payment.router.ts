import { Router } from "express";
import { requireRole } from "../middlewares/auth.middleware";
import { capturePayment } from "../controllers/payments.controller";

const paymentRouter = Router();

paymentRouter.post("/capture", requireRole(["BREEDER"]), capturePayment);

export default paymentRouter;
