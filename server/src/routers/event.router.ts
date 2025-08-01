import { Router } from "express";
import { requireRole } from "../middlewares/auth.middleware";
import {
  createEvent,
  listEvent,
  listEvents,
  listEventsByCreator,
  updateEvent,
} from "../controllers/event.controller";

const eventRouter = Router();

eventRouter.post("/", requireRole(["ADMIN"]), createEvent);
eventRouter.put("/:id", requireRole(["ADMIN"]), updateEvent);
eventRouter.get("/", listEvents);
eventRouter.get("/my", requireRole(["ADMIN"]), listEventsByCreator);
eventRouter.get("/:id", listEvent);

export default eventRouter;
