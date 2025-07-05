import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import type { Session, User } from "better-auth";
import { adminRouter } from "./routes/adminRouter";
import { userRouter } from "./routes/user.router";
const app = express();
const PORT = process.env.PORT || 4000;
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL as string,
      process.env.ADMIN_URL as string,
    ],
    credentials: true,
  })
);
app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Welcome to the API");
});
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log("Server is running on "+ process.env.BETTER_AUTH_URL);
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
