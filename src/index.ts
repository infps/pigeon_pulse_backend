import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import type { Session, User } from "better-auth";
import raceRouter from "./routes/race.router";
import { userRouter } from "./routes/user.router";
import { paymentsRouter } from "./routes/payments.router";
import { adminRouter } from "./routes/adminRouter";
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());
app.use("/api/admin", adminRouter);
app.use("/api/races", raceRouter);
app.use("/api/user", userRouter);
app.use("/api/payments", paymentsRouter);

app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});

declare global {
  namespace Express {
    interface Request {
      session?: Session;
      user?: {
        id: string;
        email: string;
        name?: string;
        image?: string | null | undefined | undefined;
        role: string;
      } & User;
    }
  }
}
