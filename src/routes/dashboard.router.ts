import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { getDashboardData } from "../controllers/dashboard.router";

export const dashboardRouter = Router();

dashboardRouter.get("/", authMiddleware, getDashboardData);
