import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import {
  createDoctorScheduleIntoDB,
  deleteMyDoctorScheduleIntoDB,
  getMyDoctorScheduleFromDB,
} from "./doctorSchedule.services";

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

const getMyDoctorSchedule = catchAsync(async (req, res) => {
  const filters = pick(req.query, ["startDate", "endDate", "isBooked"]);
  const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
  const user = req.user;
  const result = await getMyDoctorScheduleFromDB(filters, options, user);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "My doctorSchedules retrieved successfully!",
    meta: result.meta,
    data: result.data,
  });
});

const deleteMyDoctorSchedule = catchAsync(async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const result = await deleteMyDoctorScheduleIntoDB(user, id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "My doctorSchedules deleted successfully!",
    data: result,
  });
});

export { createDoctorSchedule, getMyDoctorSchedule, deleteMyDoctorSchedule };
