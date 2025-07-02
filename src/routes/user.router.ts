import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { getUserById } from "../controllers/user.controller";

export const userRouter = Router();

userRouter.get("/:id", authMiddleware, getUserById);
