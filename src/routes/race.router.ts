import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import upload from "../lib/multer";
import {
  createRace,
  getRaceById,
  getRaces,
  getRaceStats,
  updateRace,
} from "../controllers/race.controller";

const raceRouter = Router();

raceRouter.post("/create", authMiddleware, upload.single("photo"), createRace);
raceRouter.get("/", authMiddleware, getRaces);
raceRouter.get("/:id", authMiddleware, getRaceById);
raceRouter.patch("/:id", authMiddleware, updateRace);
raceRouter.get("/stats/:id", authMiddleware, getRaceStats);

export default raceRouter;
