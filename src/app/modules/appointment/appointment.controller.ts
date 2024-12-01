import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import {
  createAppointmentIntoDB,
  getAllAppointmentsFromDB,
  getMyAppointmentsFromDB,
} from "./appointment.services";

const createAppointment = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await createAppointmentIntoDB(user, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Appointment booked successfully!",
    data: result,
  });
});

const getMyAppointments = catchAsync(async (req, res) => {
  const user = req.user;
  const filters = pick(req.query, ["status", "paymentStatus"]);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await getMyAppointmentsFromDB(user, filters, options);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "My appointments retrieved successfully!",
    data: result,
  });
});

const getAllAppointments = catchAsync(async (req, res) => {
  const filters = pick(req.query, ["status", "paymentStatus"]);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await getAllAppointmentsFromDB(filters, options);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "All appointments retrieved successfully!",
    data: result,
  });
});

export { createAppointment, getMyAppointments, getAllAppointments };
