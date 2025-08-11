import { Router } from "express";
import { requireRole } from "../middlewares/auth.middleware";
import {
  createEventInventory,
  getMYEvents,
  listEventInventory,
} from "../controllers/eventInventory.controller";

const eventInventoryRouter = Router();

eventInventoryRouter.post("/", requireRole(["BREEDER"]), createEventInventory);
eventInventoryRouter.get("/my-events", requireRole(["BREEDER"]), getMYEvents);
eventInventoryRouter.get(
  "/:id",
  requireRole(["ADMIN"]),
  listEventInventory
);

export default eventInventoryRouter;
