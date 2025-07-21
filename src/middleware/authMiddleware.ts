import { NextFunction, Response } from "express";
import { IUserRequest } from "../types/IUserRequest";
import { verifyToken } from "../utils/handleJwt";
import { responseStatus } from "../utils/response";

function authMiddleware(req: IUserRequest, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    responseStatus(res, "error", 401, "Unauthorized");
    return;
  }
  const decoded = verifyToken(token);
  if (!decoded) {
    responseStatus(res, "error", 401, "Unauthorized");
    return;
  }
  req.user = decoded;
  next();
}

export default authMiddleware;
