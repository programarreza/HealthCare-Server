import { NextFunction, Request, Response } from "express";

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      console.log(token);
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
