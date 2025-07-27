import { NextFunction, Request, Response } from "express";
import { responseStatus } from "../utils/response";

export const validateParameter = (
  property: any,
  type: "params" | "query"
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const value = req[type][property];
    if (!value) {
      responseStatus(
        res,
        "error",
        400,
        `Missing parameter: ${property} in ${type}`
      );
      return;
    }
    next();
  };
};
