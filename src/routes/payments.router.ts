import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { getPayments } from "../controllers/payments.controller";

export const paymentsRouter = Router();

paymentsRouter.get("/", authMiddleware, getPayments);
