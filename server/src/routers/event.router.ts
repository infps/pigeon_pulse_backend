import { Router } from "express";
import { requireRole } from "../middlewares/auth.middleware";
import {
  createEvent,
  listEvents,
  listEventsByCreator,
  updateEvent,
} from "../controllers/event.controller";

const eventRouter = Router();

eventRouter.post("/", requireRole(["ADMIN"]), createEvent);
eventRouter.put("/:id", requireRole(["ADMIN"]), updateEvent);
eventRouter.get("/list", listEvents);
eventRouter.get("/list/creator", requireRole(["ADMIN"]), listEventsByCreator);

export default eventRouter;
