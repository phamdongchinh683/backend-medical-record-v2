import { NextFunction, Response } from "express";
import { IUserRequest } from "../types/IUserRequest";
import { responseStatus } from "../utils/response";

export const roleMiddleware = (role: number) => {
  return (req: IUserRequest, res: Response, next: NextFunction) => {
    const user = req.user;

    if (user.role !== role) {
      responseStatus(
        res,
        "error",
        403,
        "You are not authorized to access this resource"
      );
      return;
    }
    next();
  };
};
