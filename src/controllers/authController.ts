import { Request, Response } from "express";
import AuthService from "../services/authService";
import userService from "../services/userService";
import { asyncHandler } from "../utils/response";
class AuthController {
  generateMessage = asyncHandler(async (req: Request, res: Response) => {
    const address = req.address;
    await AuthService.generateMessage(res, address);
  });

  verifyMessage = asyncHandler(async (req: Request, res: Response) => {
    const address = req.address;
    await AuthService.generateTokenWithAddress(res, address);
  });

  register = asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;
    await userService.register(res, data);
  });
}

export default new AuthController();
