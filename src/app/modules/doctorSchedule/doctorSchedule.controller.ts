import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { createDoctorScheduleIntoDB } from "./doctorSchedule.services";

const createDoctorSchedule = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await createDoctorScheduleIntoDB(user, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "DoctorSchedule created successfully!",
    data: result,
  });
});

export { createDoctorSchedule };
