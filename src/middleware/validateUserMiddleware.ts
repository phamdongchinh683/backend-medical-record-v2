import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { responseStatus } from "../utils/response";

export function validateUserMiddleware(schema: Joi.ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      responseStatus(
        res,
        "error",
        400,
        error.details.map((d) => d.message).join(", ")
      );
      return;
    }
    next();
  };
}
