import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import upload from "../lib/multer";
import {
  createRace,
  getRaces,
  updateRace,
} from "../controllers/race.controller";

const raceRouter = Router();

raceRouter.post("/create", authMiddleware, upload.single("photo"), createRace);
raceRouter.get("/", authMiddleware, getRaces);
raceRouter.patch("/:id", authMiddleware, updateRace);

export default raceRouter;
