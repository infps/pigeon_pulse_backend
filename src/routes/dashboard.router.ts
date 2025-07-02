import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { getDashboardData } from "../controllers/dashboard.controller";

export const dashboardRouter = Router();

dashboardRouter.get("/", authMiddleware, getDashboardData);
