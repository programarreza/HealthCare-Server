import { Request, Response } from "express";
import pick from "../../../shared/pick";
import { adminFilterableFields } from "./admin.constant";
import {
  getAllAdminsFromDB,
  getSingleAdminByIdFromDB,
  updateAdminIntoDB,
} from "./admin.service";

const getAllAdmin = async (req: Request, res: Response) => {
  try {
    const filter = pick(req.query, adminFilterableFields);
    const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
    console.log("options", options);

    const result = await getAllAdminsFromDB(filter, options);

    res.status(200).json({
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

    res.status(200).json({
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

    res.status(200).json({
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

export { getAllAdmin, getSingleAdminById, updateAdmin };
