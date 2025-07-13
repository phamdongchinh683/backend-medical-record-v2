import { ethers } from "ethers";
import { NextFunction, Request, Response } from "express";
import { responseStatus } from "../utils/response";
import { validateAddress } from "../utils/validateAddress";

function signatureMiddleware(req: Request, res: Response, next: NextFunction) {
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

  const recoveredAddress = ethers.verifyMessage(message, signature);

  if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
    responseStatus(res, "error", 400, "Invalid signature");
    return;
  }

  req.address = address;
  next();
}

export default signatureMiddleware;
