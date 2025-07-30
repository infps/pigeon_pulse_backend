import express, { type Request, type Response } from "express";
import cors from "cors";
import { env } from "./env";

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
