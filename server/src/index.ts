import express, { type Request, type Response } from "express";
import cors from "cors";
import { env } from "./env";
import type { ReqUser } from "./types/types";
import authRouter from "./routers/auth.router";
import apiRouter from "./routers/api.router";

const app = express();
const PORT = env.PORT || 4000;

app.use(
  cors({
    origin: [env.BREEDER_DOMAIN, env.ADMIN_DOMAIN],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.use("/api", apiRouter);
app.use((req: Request, res: Response) => {
  res.status(404).send("API Endpoint not found");
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

declare global {
  namespace Express {
    interface Request {
      user?: ReqUser;
    }
  }
}
