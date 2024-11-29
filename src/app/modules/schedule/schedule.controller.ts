import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import {
  createScheduleIntoDB,
  getAllScheduleFromDB,
} from "./schedule.services";

const createSchedule = catchAsync(async (req, res) => {
  const result = await createScheduleIntoDB(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Schedule created successfully!",
    data: result,
  });
});

const getAllSchedule = catchAsync(async (req, res) => {
  const filters = pick(req.query, ["startDate", "endDate"]);
  const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
const user = req.user;
  const result = await getAllScheduleFromDB(filters, options, user);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Schedules retrieved successfully!",
    meta: result.meta,
    data: result.data,
  });
});

export { createSchedule, getAllSchedule };
