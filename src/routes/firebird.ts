import { Router } from "express";
import {
  fetchBreeders,
  fetchEventInventory,
  fetchEvents,
  fetchRaceItemResult,
  fetchRaceResult,
} from "../controllers/firebird.controller";

const fireBirdRouter = Router();

fireBirdRouter.get("/race-item", fetchRaceItemResult);
fireBirdRouter.get("/breeders", fetchBreeders);
fireBirdRouter.get("/race-result", fetchRaceResult);
fireBirdRouter.get("/event-inventory", fetchEventInventory);
fireBirdRouter.get("/events", fetchEvents);

export default fireBirdRouter;
