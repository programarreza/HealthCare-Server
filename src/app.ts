import cors from "cors";
import cookieParser from "cookie-parser";
import express, { Application, NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import router from "./app/routes";

const app: Application = express();
app.use(cors());
app.use(cookieParser())

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/v1", router);

app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(req);

  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: "API NOT FOUND!",
    error: {
      path: req.originalUrl,
      method: req.method,
      message: "Your request path is not found!",
    },
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "health care server",
  });
});

export default app;
