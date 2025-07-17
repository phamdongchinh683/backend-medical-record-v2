import { NextFunction, Response } from "express";
import userService from "../services/userService";
import { IUserRequest } from "../types/IUserRequest";
import { responseStatus } from "../utils/response";
import { validateAddress } from "../utils/validateAddress";

async function addressMiddleware(
  req: IUserRequest,
  res: Response,
  next: NextFunction
) {
  const { address } = req.params;

  if (!validateAddress(address)) {
    responseStatus(res, "error", 400, "Invalid address");
    return;
  }

  const bigIntValue: BigInt = await userService.findByAddress(address);

  if (Number(bigIntValue) === 0) {
    responseStatus(res, "error", 400, "User not found");
    return;
  }

  req.address = address;
  next();
}

export default addressMiddleware;
