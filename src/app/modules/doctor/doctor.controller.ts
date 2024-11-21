import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { getAllDoctorsFromDB, getSingleDoctorFromDB } from "./doctor.services";

const getAllDoctors = catchAsync(async (req, res) => {
  const result = await getAllDoctorsFromDB();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Doctors retrieved successfully!",
    data: result,
  });
});

const getSingleDoctor = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await getSingleDoctorFromDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Doctor retrieved successfully!",
    data: result,
  });
});

export { getAllDoctors, getSingleDoctor };
