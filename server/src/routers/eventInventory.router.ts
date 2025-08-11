import { Router } from "express";
import { requireRole } from "../middlewares/auth.middleware";
import { createEventInventory } from "../controllers/eventInventory.controller";

const eventInventoryRouter = Router();

eventInventoryRouter.post("/", requireRole(["BREEDER"]), createEventInventory);

export default eventInventoryRouter;
