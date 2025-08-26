import { Router } from "express";
import { requireRole } from "../middlewares/auth.middleware";
import {
  createRace,
  listRace,
  listRaceItems,
  listRaceResults,
  listRaces,
  publishRaceResults,
  raceItemLoftBasket,
  raceItemRaceBasket,
} from "../controllers/race.controller";

const raceRouter = Router();

raceRouter.post("/", requireRole(["ADMIN"]), createRace);
raceRouter.get("/event/:id", requireRole(["ADMIN"]), listRaces);
raceRouter.get("/:id", requireRole(["ADMIN"]), listRace);
raceRouter.get("/:id/items", requireRole(["ADMIN"]), listRaceItems);
raceRouter.post(
  "/:id/item/loft-basket",
  requireRole(["ADMIN"]),
  raceItemLoftBasket
);
raceRouter.post(
  "/:id/item/race-basket",
  requireRole(["ADMIN"]),
  raceItemRaceBasket
);
raceRouter.post(
  "/:id/publish-result",
  requireRole(["ADMIN"]),
  publishRaceResults
);
raceRouter.get("/:id/results", requireRole(["ADMIN"]), listRaceResults);

export default raceRouter;
