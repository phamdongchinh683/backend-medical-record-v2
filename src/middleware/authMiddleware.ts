import { NextFunction, Request, Response } from "express";
import { IPayload } from "../types/IPayload";
import { verifyToken } from "../utils/handleJwt";
import { responseStatus } from "../utils/response";

function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;
  if (!token) {
    responseStatus(res, "error", 401, "Unauthorized");
    return;
  }
  const decoded = verifyToken(token);
  if (!decoded) {
    responseStatus(res, "error", 401, "Unauthorized");
    return;
  }
  req.user = decoded as IPayload;
  next();
}

export default authMiddleware;
