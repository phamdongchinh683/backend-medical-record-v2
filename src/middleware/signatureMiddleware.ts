import { ethers } from "ethers";
import { NextFunction, Response } from "express";
import { IUserRequest } from "../types/IUserRequest";
import { responseStatus } from "../utils/response";
import { validateAddress } from "../utils/validateAddress";

function signatureMiddleware(
  req: IUserRequest,
  res: Response,
  next: NextFunction
) {
  const { address, message, signature } = req.body;

  if (!address || !message || !signature) {
    responseStatus(
      res,
      "error",
      400,
      "Address, message and signature are required"
    );
    return;
  }

  if (!validateAddress(address)) {
    responseStatus(res, "error", 400, "Invalid address");
    return;
  }

  try {
    const recoveredAddress = ethers.verifyMessage(message, signature);

    if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
      responseStatus(res, "error", 400, "Invalid signature");
      return;
    }
    req.address = address;
    next();
  } catch (error) {
    responseStatus(res, "error", 400, "Invalid signature");
    return;
  }
}

export default signatureMiddleware;
