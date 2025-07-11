import { Router } from "express";
import { adminMiddleware } from "../middlewares/admin.middleware";
import {
  createRace,
  deleteRace,
  getAllPayments,
  getBirdByUserId,
  getDashboardData,
  getPaymentsByUser,
  getRaceById,
  getRaces,
  getRacesJoined,
  getRaceStatistics,
  getRaceStatisticsById,
  getUserById,
  getUsers,
  getUserSummary,
  getWinsByUser,
  updateRace,
  updateUserStatus,
  getHospitality
} from "../controllers/admin.controller";
import upload from "../lib/multer";

export const adminRouter = Router();

adminRouter.get("/users", adminMiddleware, getUsers);
adminRouter.get("/users/:id", adminMiddleware, getUserById);
adminRouter.get("/users/summary/:id", adminMiddleware, getUserSummary);
adminRouter.put("/users/:id", adminMiddleware, updateUserStatus);
adminRouter.get("/users/birds/:id", adminMiddleware, getBirdByUserId);
adminRouter.get("/users/races/:id", adminMiddleware, getRacesJoined);
adminRouter.get("/users/wins/:id", adminMiddleware, getWinsByUser);
adminRouter.get("/users/payments/:id", adminMiddleware, getPaymentsByUser);
adminRouter.get("/races", adminMiddleware, getRaces);
adminRouter.delete("races/:id", adminMiddleware, deleteRace);
adminRouter.post(
  "/races/create",
  adminMiddleware,
  upload.single("image"),
  createRace
);
adminRouter.get("/races/:id", adminMiddleware, getRaceById);
adminRouter.patch(
  "/races/update/:id",
  adminMiddleware,
  upload.none(),
  updateRace
);
adminRouter.get("/dashboard", adminMiddleware, getDashboardData);
adminRouter.get("/payments", adminMiddleware, getAllPayments);
adminRouter.get("/race-stats", adminMiddleware, getRaceStatistics);
adminRouter.get("/race-stats/:id", adminMiddleware, getRaceStatisticsById);
adminRouter.get("/hospitality", adminMiddleware, getHospitality);
