import { Request, Response } from "express";
import { createAdminIntoDB } from "./user.service";

const createAdmin = async (req: Request, res: Response) => {
  try {
    const result = await createAdminIntoDB(req.body);

    res.status(200).json({
      success: true,
      message: "Admin created successfully!",
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

export { createAdmin };
