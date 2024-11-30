import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import {
  createScheduleIntoDB,
  deleteScheduleIntoDB,
  getAllScheduleFromDB,
  getSingleScheduleFromDB,
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

const getSingleSchedule = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await getSingleScheduleFromDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Schedule retrieved successfully!",
    data: result,
  });
});

const deleteSchedule = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  const result = await deleteScheduleIntoDB(user, id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Schedule deleted successfully!",
    data: result,
  });
});

export { createSchedule, deleteSchedule, getAllSchedule, getSingleSchedule };
