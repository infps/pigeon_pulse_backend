import { Router } from "express";
import authRouter from "./auth.router";
import schemaRouter from "./schema.router";
import eventRouter from "./event.router";
import userRouter from "./user.router";

const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/schema", schemaRouter);
apiRouter.use("/events", eventRouter);
apiRouter.use("/users", userRouter);

export default apiRouter;
