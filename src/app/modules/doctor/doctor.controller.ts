import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { doctorFilterableFields } from "./doctor.constant";
import {
  deleteDoctorIntoDB,
  getAllDoctorsFromDB,
  getSingleDoctorFromDB,
  softDeleteDoctorIntoDB,
  updateDoctorIntoDB,
} from "./doctor.services";

const getAllDoctors = catchAsync(async (req, res) => {
  const filters = pick(req.query, doctorFilterableFields);

  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await getAllDoctorsFromDB(filters, options);

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
