import { Router } from "express";
import {
  adminLogin,
  adminLogout,
  adminSignup,
  breederlogin,
  breederlogout,
  breedersignup,
} from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/breeder/signup", breedersignup);
authRouter.post("/breeder/login", breederlogin);
authRouter.post("/breeder/logout", breederlogout);

authRouter.post("/admin/signup", adminSignup);
authRouter.post("/admin/login", adminLogin);
authRouter.post("/admin/logout", adminLogout);
export default authRouter;
