import { Router } from "express";
import {
  adminLogin,
  adminLogout,
  adminSignup,
  breederlogin,
  breederlogout,
  breedersignup,
  getSession,
} from "../controllers/auth.controller";
import { requireRole } from "../middlewares/auth.middleware";

const authRouter = Router();

authRouter.get(
  "/session",
  requireRole(["BREEDER", "ADMIN", "SUPER_ADMIN"]),
  getSession
);
authRouter.post("/breeder/signup", breedersignup);
authRouter.post("/breeder/login", breederlogin);
authRouter.post("/breeder/logout", breederlogout);

authRouter.post("/admin/signup", adminSignup);
authRouter.post("/admin/login", adminLogin);
authRouter.post("/admin/logout", adminLogout);
export default authRouter;
