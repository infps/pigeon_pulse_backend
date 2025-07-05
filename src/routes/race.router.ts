import { Router } from "express";
import { getRaceById, getRaces } from "../controllers/race.controller";

export const raceRouter = Router();

raceRouter.get("/", getRaces);
raceRouter.get("/:id", getRaceById);
