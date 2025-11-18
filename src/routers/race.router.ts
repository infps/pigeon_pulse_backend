import { Router } from "express";
import { requireRole } from "../middlewares/auth.middleware";
import {
  createRace,
  listRace,
  listRaceItems,
  listRaceResults,
  listBaskets,
  createBasket,
  updateBasket,
  deleteBasket,
  updateRaceItem,
  assignToBasket,
  listRaces,
  publishRaceResults,
  raceItemLoftBasket,
  raceItemRaceBasket,
  updateRace,
} from "../controllers/race.controller";

const raceRouter = Router();

raceRouter.post("/", requireRole(["ADMIN"]), createRace);
raceRouter.patch("/:id", requireRole(["ADMIN"]), updateRace);
raceRouter.get("/event/:id", requireRole(["ADMIN"]), listRaces);
raceRouter.get("/:id", requireRole(["ADMIN"]), listRace);
raceRouter.get("/:id/items", requireRole(["ADMIN"]), listRaceItems);
raceRouter.patch(
  "/:id/items/:raceItemId",
  requireRole(["ADMIN"]),
  updateRaceItem
);
raceRouter.get("/:id/baskets", requireRole(["ADMIN"]), listBaskets);
raceRouter.post("/:id/baskets", requireRole(["ADMIN"]), createBasket);
raceRouter.patch(
  "/:id/baskets/:basketId",
  requireRole(["ADMIN"]),
  updateBasket
);
raceRouter.delete(
  "/:id/baskets/:basketId",
  requireRole(["ADMIN"]),
  deleteBasket
);
raceRouter.post(
  "/:id/baskets/:basketId/assign",
  requireRole(["ADMIN"]),
  assignToBasket
);
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
