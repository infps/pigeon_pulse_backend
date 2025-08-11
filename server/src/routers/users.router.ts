import { Router } from "express";
import { requireRole } from "../middlewares/auth.middleware";
import { getProfile, updateProfile } from "../controllers/user.controller";

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

export default userRouter;
