import cors from "cors";
import express, { Application, Request, Response } from "express";
import userRoutes from "./app/modules/user/user.routes";

const app: Application = express();
app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/v1/users", userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "health care server",
  });
});

export default app;
