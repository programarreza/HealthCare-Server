import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { createScheduleIntoDB } from "./schedule.services";

const createSchedule = catchAsync(async (req, res) => {
  const result = await createScheduleIntoDB(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Schedule created successfully!",
    data: result,
  });
});

export { createSchedule };
