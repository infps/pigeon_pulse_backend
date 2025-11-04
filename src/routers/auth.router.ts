import { Router } from "express";
import {
  adminLogin,
  adminLogout,
  adminSignup,
  breederlogin,
  breederlogout,
  breedersignup,
  getBreederSession,
  getAdminSession
} from "../controllers/auth.controller";
import { requireRole } from "../middlewares/auth.middleware";

const authRouter = Router();

authRouter.get(
  "/breeder/session",
  requireRole(["BREEDER"]),
  getBreederSession
);
authRouter.post("/breeder/signup", breedersignup);
authRouter.post("/breeder/login", breederlogin);
authRouter.post("/breeder/logout", breederlogout);

authRouter.get(
  "/admin/session",
  requireRole(["ADMIN", "SUPER_ADMIN"]),
  getAdminSession
);
authRouter.post("/admin/signup", adminSignup);
authRouter.post("/admin/login", adminLogin);
authRouter.post("/admin/logout", adminLogout);
export default authRouter;
