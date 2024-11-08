import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { adminFilterableFields } from "./admin.constant";
import {
  deleteAdminIntoDB,
  getAllAdminsFromDB,
  getSingleAdminByIdFromDB,
  softDeleteAdminIntoDB,
  updateAdminIntoDB,
} from "./admin.service";

const getAllAdmin = catchAsync(async (req, res) => {
  const filter = pick(req.query, adminFilterableFields);
  const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
  console.log("options", options);

  const result = await getAllAdminsFromDB(filter, options);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Admins retrieved successfully!",
    meta: result.meta,
    data: result.data,
  });
});

const getSingleAdminById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await getSingleAdminByIdFromDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Admin retrieved successfully!",
    data: result,
  });
});

const updateAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await updateAdminIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Admin updated successfully!",
    data: result,
  });
});

const deleteAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await deleteAdminIntoDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Admin deleted successfully!",
    data: result,
  });
});

const softDeleteAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await softDeleteAdminIntoDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Admin deleted successfully!",
    data: result,
  });
});

export {
  deleteAdmin,
  getAllAdmin,
  getSingleAdminById,
  softDeleteAdmin,
  updateAdmin,
};
