import { Router } from "express";
import { getRaceById, getRaces,createRaceOrder, capturePayPalPayment } from "../controllers/race.controller";

export const raceRouter = Router();

raceRouter.get("/", getRaces);
raceRouter.get("/:id", getRaceById);
raceRouter.post("/register/:id",createRaceOrder);
raceRouter.post("/capture/:orderId", capturePayPalPayment);
