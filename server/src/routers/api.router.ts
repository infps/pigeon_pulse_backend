import { Router } from "express";
import authRouter from "./auth.router";
import schemaRouter from "./schema.router";
import eventRouter from "./event.router";

const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/schema", schemaRouter);
apiRouter.use("/event", eventRouter);

export default apiRouter;
