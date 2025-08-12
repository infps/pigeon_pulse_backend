import { Router } from "express";
import { requireRole } from "../middlewares/auth.middleware";
import { createRace, listRaces } from "../controllers/race.controller";

const raceRouter = Router();

raceRouter.post("/", requireRole(["ADMIN"]), createRace);
raceRouter.get("/event/:id", requireRole(["ADMIN"]), listRaces);

export default raceRouter;
