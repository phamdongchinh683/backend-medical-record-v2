import { NextFunction, Response } from "express";
import { IUserRequest } from "../types/IUserRequest";
import { verifyToken } from "../utils/handleJwt";
import { responseStatus } from "../utils/response";

function authMiddleware(req: IUserRequest, res: Response, next: NextFunction) {
  const token = req.cookies.authorization;
  if (!token) {
    responseStatus(res, "error", 401, "Unauthorized");
    return;
  }

  try {
    let decoded = verifyToken(token);
    if (!decoded) {
      responseStatus(res, "error", 401, "Unauthorized");
      return;
    }
    req.user = decoded;
    req.token = token;
    next();
  } catch (e) {
    if (e.name === "TokenExpiredError") {
      responseStatus(res, "error", 401, "Token expired, please login again");
      return;
    }
    responseStatus(res, "error", 401, "Unauthorized");
    return;
  }
}

export default authMiddleware;
