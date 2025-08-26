import { Router } from "express";
import { requireRole } from "../middlewares/auth.middleware";
import {
  createEventInventory,
  getEventInventoryDetails,
  getMYEvents,
  listEventInventory,
  updateEventInventoryItem,
} from "../controllers/eventInventory.controller";

const eventInventoryRouter = Router();

eventInventoryRouter.post("/", requireRole(["BREEDER"]), createEventInventory);
eventInventoryRouter.get("/my-events", requireRole(["BREEDER"]), getMYEvents);
eventInventoryRouter.get(
  "/event/:id",
  requireRole(["ADMIN"]),
  listEventInventory
);
eventInventoryRouter.get(
  "/:id",
  requireRole(["ADMIN"]),
  getEventInventoryDetails
);
eventInventoryRouter.put(
  "/item/:id",
  requireRole(["ADMIN"]),
  updateEventInventoryItem
);

export default eventInventoryRouter;
