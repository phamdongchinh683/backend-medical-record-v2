import { Request, Response } from "express";
import AuthService from "../services/authService";
import userService from "../services/userService";
import { IUserRequest } from "../types/IUserRequest";
import { asyncHandler } from "../utils/response";
class AuthController {
  generateMessage = asyncHandler(async (req: IUserRequest, res: Response) => {
    await AuthService.generateMessage(res, req.address);
  });

  verifyMessage = asyncHandler(async (req: IUserRequest, res: Response) => {
    await AuthService.generateTokenWithAddress(res, req.address);
  });

  register = asyncHandler(async (req: Request, res: Response) => {
    await userService.register(res, req.body);
  });

  profile = asyncHandler(async (req: IUserRequest, res: Response) => {
    await userService.profile(res, req.user.address);
  });

  updateProfile = asyncHandler(async (req: IUserRequest, res: Response) => {
    await userService.updateProfile(res, req.body, req.user.address);
  });

  updateStatus = asyncHandler(async (req: IUserRequest, res: Response) => {
    await userService.updateActiveStatus(res, req.body, req.user.address);
  });

  logout = asyncHandler(async (req: Request, res: Response) => {
    await AuthService.deleteToken(res);
  });

  findByCitizenIdentification = asyncHandler(
    async (req: Request, res: Response) => {
      await AuthService.findByCitizenIdentification(
        res,
        req.params.citizenIdentificationId
      );
    }
  );
}

export default new AuthController();
