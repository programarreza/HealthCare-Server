import { Request, Response } from "express";
import { getAllAdminsFromDB } from "./admin.service";

const getAllAdmin = async (req: Request, res: Response) => {
  try {
    const result = await getAllAdminsFromDB(req.query);

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
