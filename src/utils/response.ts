import { Response } from "express";

export function responseStatus(
  res: Response,
  status: "success" | "error",
  statusCode: number,
  message: string,
  data?: any
) {
  if (status == "success") {
    return res.status(statusCode).json({
      status,
      message,
      data,
    });
  } else {
    return res.status(statusCode).json({
      status,
      message,
    });
  }
}

export function asyncHandler(fn: Function) {
  return function (req: any, res: any) {
    Promise.resolve(fn(req, res)).catch((error) => {
      responseStatus(res, "error", 500, error.message);
    });
  };
}
