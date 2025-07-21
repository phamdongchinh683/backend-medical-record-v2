import { NextFunction, Request, Response } from "express";
import { responseStatus } from "../utils/response";

export function validateInputMiddleware(schema: any) {
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
