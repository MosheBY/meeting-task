import express from "express";
import cors from "cors";
import { router } from "./controllers-layer/meetings-controller";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.use("/", router);

app.listen(3001, () => console.log("Listening..."));
