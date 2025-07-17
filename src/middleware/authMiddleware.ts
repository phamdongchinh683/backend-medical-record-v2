import { NextFunction, Request, Response } from "express";
import { IPayload } from "../types/IPayload";
import { verifyToken } from "../utils/handleJwt";
import { responseStatus } from "../utils/response";
import { IUserRequest } from "../types/IUserRequest";

function authMiddleware(req: IUserRequest, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1];
  console.log(token)
  if (!token) {
    responseStatus(res, "error", 401, "Unauthorized");
    return;
  }
  const decoded = verifyToken(token);
  console.log(decoded)
  if (!decoded) {
    responseStatus(res, "error", 401, "Unauthorized");
    return;
  }
  req.user = decoded;
  next();
}

export default authMiddleware;
