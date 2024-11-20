import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { createSpecialtiesIntoDB } from "./specialties.services";

const createSpecialties = catchAsync(async (req, res) => {
  const result = await createSpecialtiesIntoDB(req);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Specialties created successfully!",
    data: result,
  });
});

export { createSpecialties };
