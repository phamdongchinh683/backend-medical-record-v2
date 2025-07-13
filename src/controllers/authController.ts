import { Request, Response } from "express";
import AuthService from "../services/authService";
import { responseStatus } from "../utils/response";

class AuthController {
  async generateMessage(req: Request, res: Response) {
    const address = req.address;
    try {
      await AuthService.generateMessage(res, address);
    } catch (error) {
      responseStatus(res, "error", 500, error.message);
      return;
    }
  }

  async verifyMessage(req: Request, res: Response) {
    const address = req.address;
    try {
      await AuthService.generateTokenWithAddress(res, address);
      return;
    } catch (error) {
      responseStatus(res, "error", 500, error.message);
      return;
    }
  }
}

export default new AuthController();
