import { NextFunction, Request, Response } from "express";
import { Secret } from "jsonwebtoken";
import { verifyToken } from "../../helpers/jwtHelpers";
import config from "../config";

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new Error("You are not authorized!");
      }

      const verifiedUser = verifyToken(
        token,
        config.jwt_access_secret as Secret
      );

      if (roles.length && !roles.includes(verifiedUser.role)) {
        throw new Error("You are not authorized!");
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
