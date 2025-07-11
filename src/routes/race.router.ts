import { Router } from "express";
import {
  getRaceById,
  getRaces,
  createRaceOrder,
  capturePayPalPayment,
} from "../controllers/race.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

export const raceRouter = Router();

raceRouter.get("/", getRaces);
raceRouter.get("/:id", getRaceById);
raceRouter.post("/register/:id", authMiddleware, createRaceOrder);
raceRouter.post("/capture", authMiddleware, capturePayPalPayment);
