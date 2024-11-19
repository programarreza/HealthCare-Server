import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import {
  createAdminIntoDB,
  createDoctorIntoDB,
  createPatientIntoDB,
} from "./user.service";

const createAdmin = catchAsync(async (req, res) => {
  const result = await createAdminIntoDB(req);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Admin created successfully!",
    data: result,
  });
});

const createDoctor = catchAsync(async (req, res) => {
  const result = await createDoctorIntoDB(req);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Doctor created successfully!",
    data: result,
  });
});

const createPatient = catchAsync(async (req, res) => {
  const result = await createPatientIntoDB(req);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Patient created successfully!",
    data: result,
  });
});

export { createAdmin, createDoctor, createPatient };
