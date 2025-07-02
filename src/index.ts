import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import type { Session, User } from "better-auth";
import raceRouter from "./routes/race.router";
const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());
app.use("/api/races", raceRouter);

app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});

declare global {
  namespace Express {
    interface Request {
      session?: Session;
      user?: User;
    }
  }
}
