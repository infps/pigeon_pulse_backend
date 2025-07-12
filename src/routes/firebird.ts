import { Router } from "express";
import { fetchFirebirdData } from "../controllers/firebird.controller";

const fireBirdRouter = Router();

fireBirdRouter.get("/", fetchFirebirdData);

export default fireBirdRouter;
