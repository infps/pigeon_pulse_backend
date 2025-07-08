import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  getMyDashboard,
  getMyLofts,
  getLoftById,
  getSharedLofts,
  getMyRaces,
  getMyPayments,
  createLoft,
  updateLoft,
  createBird,
  updateBird,
  inviteToLoft,
  acceptLoftInvitation,
  rejectLoftInvitation,
  getLoftInvitations,
  getBirdById,
  listUsersByEmail,
} from "../controllers/user.controller";
import upload from "../lib/multer";

export const userRouter = Router();

userRouter.get("/dashboard", authMiddleware, getMyDashboard);
userRouter.get("/lofts", authMiddleware, getMyLofts);
userRouter.get("/lofts/:id", authMiddleware, getLoftById);
userRouter.get("/shared-lofts", authMiddleware, getSharedLofts);
userRouter.get("/races", authMiddleware, getMyRaces);
userRouter.get("/payments", authMiddleware, getMyPayments);
userRouter.post("/lofts/create", authMiddleware, createLoft);
userRouter.put("/lofts/:id", authMiddleware, updateLoft);
userRouter.post(
  "/lofts/:id/birds/create",
  authMiddleware,
  upload.single("photo"),
  createBird
);
userRouter.put("/birds/:id", authMiddleware, updateBird);
userRouter.get("/birds/:id", authMiddleware, getBirdById);
userRouter.get("/", authMiddleware, listUsersByEmail);
userRouter.post("/lofts/invite/:loftid", authMiddleware, inviteToLoft);
userRouter.post(
  "/lofts/invitations/accept/:id",
  authMiddleware,
  acceptLoftInvitation
);
userRouter.post(
  "/lofts/invitations/reject/:id",
  authMiddleware,
  rejectLoftInvitation
);
userRouter.get("/lofts/invitations", authMiddleware, getLoftInvitations);
