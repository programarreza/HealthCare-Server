import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import sendResponse from "../../../shared/sendResponse";
import { createAdminIntoDB } from "./user.service";

const createAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await createAdminIntoDB(req.body);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Admin created successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export { createAdmin };
