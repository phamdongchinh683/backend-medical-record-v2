import { Response } from "express";
import contract from "../config/contract";
import { IPayload } from "../types/IPayload";
import { generateToken } from "../utils/handleJwt";
import { responseStatus } from "../utils/response";

class AuthService {
  async generateMessage(res: Response, address: string) {
    const timestamp = new Date().toISOString();
    const message = `Sign in to MedicalNFT at ${timestamp} for ${address}`;
    try {
      responseStatus(
        res,
        "success",
        200,
        "Message generated successfully",
        message
      );
    } catch (error) {
      responseStatus(res, "error", 500, error.message);
    }
  }

  async generateTokenWithAddress(res: Response, address: string) {
    const role = await contract.roles(address);

    if (Number(role) === 0) {
      throw new Error("User not registered");
    }

    const payload: IPayload = {
      address: address.toLowerCase(),
      role: Number(role),
    };

    const token = generateToken(payload);
    try {
      responseStatus(
        res,
        "success",
        200,
        "Token generated successfully",
        token
      );
    } catch (error) {
      responseStatus(res, "error", 500, error.message);
    }
  }
}

export default new AuthService();
