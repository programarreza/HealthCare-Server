import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { createAppointmentIntoDB } from "./appointment.services";

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

export { createAppointment };
