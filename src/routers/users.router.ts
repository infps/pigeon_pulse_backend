import { Router } from "express";
import { requireRole } from "../middlewares/auth.middleware";
import {
  getAdminProfile,
  getBreederProfile,
  getBreedersAddressBook,
  getBreedersByEvent,
  updateBreederProfile,
} from "../controllers/user.controller";

const userRouter = Router();

userRouter.get(
  "/admin/profile",
  requireRole(["ADMIN", "SUPER_ADMIN"]),
  getAdminProfile
);
userRouter.get("/breeder/profile", requireRole(["BREEDER"]), getBreederProfile);
userRouter.put(
  "/breeder/profile",
  requireRole(["BREEDER"]),
  updateBreederProfile
);

userRouter.get(
  "/breeders/event/:eventId",
  requireRole(["ADMIN"]),
  getBreedersByEvent
);

userRouter.get("/breeders", requireRole(["ADMIN"]), getBreedersAddressBook);
export default userRouter;
