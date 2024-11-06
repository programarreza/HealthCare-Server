import { Request, Response } from "express";
import pick from "../../../shared/pick";
import { adminFilterableFields } from "./admin.constant";
import { getAllAdminsFromDB } from "./admin.service";

const getAllAdmin = async (req: Request, res: Response) => {
  try {
    const filter = pick(req.query, adminFilterableFields);
    const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
    console.log("options", options);

    const result = await getAllAdminsFromDB(filter, options);

    res.status(200).json({
      success: true,
      message: "Admins retrieved successfully!",
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

export { getAllAdmin };
