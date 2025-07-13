import { NextFunction, Request, Response } from "express";
import { responseStatus } from "../utils/response";
import { validateAddress } from "../utils/validateAddress";

function addressMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { address } = req.params;
  console.log(address)
  if (!validateAddress(address)) {
    responseStatus(res, "error", 400, "Invalid address");
    return;
  }
  req.address = address;
  next();
}

export default addressMiddleware;
