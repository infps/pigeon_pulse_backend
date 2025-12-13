import { Router } from "express";
import { requireRole } from "../middlewares/auth.middleware";
import {
  getAdminProfile,
  getBreederProfile,
  getBreedersAddressBook,
  getBreedersByEvent,
  updateBreederProfile,
  updateBreederByAdmin,
  getBreederById,
  createBreeder,
  createTeam,
  deleteTeam,
  updateTeam,
  getBreederTeams
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

userRouter.get("/breeders/:breederId", requireRole(["ADMIN"]), getBreederById);

userRouter.post("/breeders", requireRole(["ADMIN"]), createBreeder);

userRouter.put(
  "/breeders/:breederId",
  requireRole(["ADMIN"]),
  updateBreederByAdmin
);

userRouter.post("/teams", requireRole(["ADMIN", "BREEDER"]), createTeam);
userRouter.get("/teams/:breederId", requireRole(["ADMIN", "BREEDER"]), getBreederTeams);
userRouter.delete(
  "/teams/:teamId",
  requireRole(["ADMIN", "BREEDER"]),
  deleteTeam
);
userRouter.put(
  "/teams/:teamId",
  requireRole(["ADMIN", "BREEDER"]),
  updateTeam
);

export default userRouter;
