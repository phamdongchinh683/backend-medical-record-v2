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
      data,
    });
  } else {
    return res.status(statusCode).json({
      status,
      message,
    });
  }
}
