import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  getBirdByUserId,
  getRacesJoined,
  getTotalAmountPaid,
  getUserById,
  getUsers,
  getWinsByUser,
} from "../controllers/user.controller";

export const userRouter = Router();

userRouter.get("/:id", authMiddleware, getUserById);
userRouter.get("/", authMiddleware, getUsers);
userRouter.get("/:id/wins", authMiddleware, getWinsByUser);
userRouter.get("/:id/total-paid-amount", authMiddleware, getTotalAmountPaid);
userRouter.get("/:id/get-races-joined", authMiddleware, getRacesJoined);
userRouter.get("/:id/birds", authMiddleware, getBirdByUserId);
