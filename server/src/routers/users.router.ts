import { Router } from "express";
import { requireRole } from "../middlewares/auth.middleware";
import {
  getBreedersByEvent,
  getProfile,
  updateProfile,
} from "../controllers/user.controller";

const userRouter = Router();

userRouter.get(
  "/profile",
  requireRole(["BREEDER", "ADMIN", "SUPER_ADMIN"]),
  getProfile
);
userRouter.put(
  "/profile",
  requireRole(["BREEDER", "ADMIN", "SUPER_ADMIN"]),
  updateProfile
);

userRouter.get(
  "/breeders/event/:eventId",
  requireRole(["ADMIN"]),
  getBreedersByEvent
);

export default userRouter;
