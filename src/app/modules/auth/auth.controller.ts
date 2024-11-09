import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { loginUserFromDB, refreshTokenIntoDB } from "./auth.service";

const loginUser = catchAsync(async (req, res) => {
  const { accessToken, refreshToken, needPasswordChange } =
    await loginUserFromDB(req.body);

  res.cookie("refreshToken", refreshToken, {
    secure: false,
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User logged in successfully!",
    data: {
      accessToken,
      needPasswordChange,
    },
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await refreshTokenIntoDB(refreshToken);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "token generate successfully!",
    data: result,
  });
});

export { loginUser, refreshToken };
