import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { createAdminIntoDB } from "./user.service";

const createAdmin = catchAsync(async (req, res) => {
  const result = await createAdminIntoDB(req);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Admin created successfully!",
    data: result,
  });
});

export { createAdmin };
