import { Router } from "express";
import { requireRole } from "../middlewares/auth.middleware";
import {
  addBird,
  getBirdsPerEvent,
  getMyBirds,
  updateBird,
} from "../controllers/bird.controller";

const birdsRouter = Router();

birdsRouter.get("/", requireRole(["BREEDER"]), getMyBirds);
birdsRouter.post("/", requireRole(["BREEDER"]), addBird);
birdsRouter.put("/:id", requireRole(["BREEDER"]), updateBird);
birdsRouter.get("/event/:id", requireRole(["ADMIN"]), getBirdsPerEvent);
export default birdsRouter;
