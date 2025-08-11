import { Router } from "express";
import authRouter from "./auth.router";
import schemaRouter from "./schema.router";
import eventRouter from "./events.router";
import userRouter from "./users.router";
import birdsRouter from "./birds.router";
import paymentRouter from "./payment.router";
import eventInventoryRouter from "./eventInventory.router";

const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/schema", schemaRouter);
apiRouter.use("/events", eventRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/birds", birdsRouter);
apiRouter.use("/event-inventory", eventInventoryRouter);
apiRouter.use("/payments", paymentRouter);

export default apiRouter;
