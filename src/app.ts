import cors from "cors";
import express, { Application, Request, Response } from "express";
import adminRoutes from "./app/modules/admin/admin.routes";
import userRoutes from "./app/modules/user/user.routes";

const app: Application = express();
app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/admins", adminRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "health care server",
  });
});

export default app;
