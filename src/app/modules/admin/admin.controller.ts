import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { adminFilterableFields } from "./admin.constant";
import {
  deleteAdminIntoDB,
  getAllAdminsFromDB,
  getSingleAdminByIdFromDB,
  softDeleteAdminIntoDB,
  updateAdminIntoDB,
} from "./admin.service";

const getAllAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filter = pick(req.query, adminFilterableFields);
    const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
    console.log("options", options);

    const result = await getAllAdminsFromDB(filter, options);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Admins retrieved successfully!",
      meta: result.meta,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleAdminById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await getSingleAdminByIdFromDB(id);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Admin retrieved successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await updateAdminIntoDB(id, req.body);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Admin updated successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await deleteAdminIntoDB(id);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Admin deleted successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const softDeleteAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await softDeleteAdminIntoDB(id);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Admin deleted successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export {
  deleteAdmin,
  getAllAdmin,
  getSingleAdminById,
  softDeleteAdmin,
  updateAdmin,
};
