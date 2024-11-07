import { Request, Response } from "express";
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

const getAllAdmin = async (req: Request, res: Response) => {
  try {
    const filter = pick(req.query, adminFilterableFields);
    const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
    console.log("options", options);

    const result = await getAllAdminsFromDB(filter, options);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admins retrieved successfully!",
      meta: result.meta,
      data: result.data,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.name || "Something went wrong",
      error: error,
    });
  }
};

const getSingleAdminById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await getSingleAdminByIdFromDB(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admin retrieved successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.name || "Something went wrong",
      error: error,
    });
  }
};

const updateAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await updateAdminIntoDB(id, req.body);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admin updated successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.name || "Something went wrong",
      error: error,
    });
  }
};

const deleteAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await deleteAdminIntoDB(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admin deleted successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.name || "Something went wrong",
      error: error,
    });
  }
};

const softDeleteAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await softDeleteAdminIntoDB(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admin deleted successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.name || "Something went wrong",
      error: error,
    });
  }
};

export {
  deleteAdmin,
  getAllAdmin,
  getSingleAdminById,
  softDeleteAdmin,
  updateAdmin,
};
