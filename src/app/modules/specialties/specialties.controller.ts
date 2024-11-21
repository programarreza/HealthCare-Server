import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import {
  createSpecialtiesIntoDB,
  deleteSpecialtiesIntoDB,
  getAllSpecialtiesFromDB,
} from "./specialties.services";

const createSpecialties = catchAsync(async (req, res) => {
  const result = await createSpecialtiesIntoDB(req);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Specialties created successfully!",
    data: result,
  });
});

const getAllSpecialties = catchAsync(async (req, res) => {
  const result = await getAllSpecialtiesFromDB();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Specialties retrieved successfully!",
    data: result,
  });
});

const deleteSpecialties = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await deleteSpecialtiesIntoDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Specialties deleted successfully!",
    data: result,
  });
});

export { createSpecialties, deleteSpecialties, getAllSpecialties };
