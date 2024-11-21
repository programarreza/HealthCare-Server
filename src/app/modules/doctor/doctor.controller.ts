import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import {
  deleteDoctorIntoDB,
  getAllDoctorsFromDB,
  getSingleDoctorFromDB,
  softDeleteDoctorIntoDB,
  updateDoctorIntoDB,
} from "./doctor.services";

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

const softDeleteDoctor = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await softDeleteDoctorIntoDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Doctor deleted successfully!",
    data: result,
  });
});

const deleteDoctor = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await deleteDoctorIntoDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Doctor deleted successfully!",
    data: result,
  });
});

const updateDoctor = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await updateDoctorIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Doctor updated successfully!",
    data: result,
  });
});

export {
  deleteDoctor,
  getAllDoctors,
  getSingleDoctor,
  softDeleteDoctor,
  updateDoctor,
};
