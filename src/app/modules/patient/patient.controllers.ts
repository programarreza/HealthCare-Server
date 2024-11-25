import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { patientFilterableFields } from "./patient.constant";
import {
  deletePatientIntoDB,
  getAllPatientFromDB,
  getSinglePatientFromDB,
  updatePatientIntoDB,
} from "./patient.services";

const getAllPatients = catchAsync(async (req, res) => {
  const filter = pick(req.query, patientFilterableFields);
  const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);

  const result = await getAllPatientFromDB(filter, options);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Patients retrieved successfully!",
    meta: result.meta,
    data: result.data,
  });
});

const getSinglePatient = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await getSinglePatientFromDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Patient retrieved successfully!",
    data: result,
  });
});

const updatePatient = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await updatePatientIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Patient updated successfully!",
    data: result,
  });
});

const deletePatient = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await deletePatientIntoDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Patient deleted successfully!",
    data: result,
  });
});

export { deletePatient, getAllPatients, getSinglePatient, updatePatient };
