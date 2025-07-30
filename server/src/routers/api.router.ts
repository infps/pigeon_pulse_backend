import { Router } from "express";
import authRouter from "./auth.router";
import schemaRouter from "./schema.router";

const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/schema", schemaRouter);

export default apiRouter;
