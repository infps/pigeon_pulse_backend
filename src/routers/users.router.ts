import { Router } from "express";
import { requireRole } from "../middlewares/auth.middleware";
import {
  getBreedersAddressBook,
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

userRouter.get("/breeders", requireRole(["ADMIN"]), getBreedersAddressBook);
export default userRouter;
