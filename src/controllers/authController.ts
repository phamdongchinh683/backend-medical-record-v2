import { Request, Response } from "express";
import AuthService from "../services/authService";
import userService from "../services/userService";
import { IUserRequest } from "../types/IUserRequest";
import { asyncHandler, responseStatus } from "../utils/response";
class AuthController {
  generateMessage = asyncHandler(async (req: IUserRequest, res: Response) => {
    const address = req.address;
    await AuthService.generateMessage(res, address);
  });

  verifyMessage = asyncHandler(async (req: IUserRequest, res: Response) => {
    const address = req.address;
    await AuthService.generateTokenWithAddress(res, address);
  });

  register = asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;
    await userService.register(res, data);
  });

  profile = asyncHandler(async (req: IUserRequest, res: Response) => {
    const user = req.user;
    if (!user) {
      responseStatus(res, "error", 401, "Invalid or missing address in token");
      return;
    }
    await userService.profile(res, user.address);
  });

  updateProfile = asyncHandler(async (req: IUserRequest, res: Response) => {
    const user = req.user;
    const data = req.body;
    if (!user) {
      responseStatus(res, "error", 401, "Invalid or missing address in token");
      return;
    }
    await userService.updateProfile(res, data, user.address);
  });

  updateStatus = asyncHandler(async (req: IUserRequest, res: Response) => {
    const user = req.user;
    const data = req.body;
    if (!user) {
      responseStatus(res, "error", 401, "Invalid or missing address in token");
      return;
    }
    await userService.updateActiveStatus(res, data, user.address);
  });
}

export default new AuthController();
