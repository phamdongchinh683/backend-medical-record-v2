import { NextFunction, Request, Response } from "express";

export function validatePaginationQuery(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { page, limit } = req.query;
  if (!page || !limit) {
    req.query.page = "1";
    req.query.limit = "10";
  } else {
    req.query.page = page.toString();
    req.query.limit = limit.toString();
  }
  next();
}
