import { Response } from "express";
import contract from "../config/contract";
import { UserRepository } from "../repositories/UserRepository";
import { IPayload } from "../types/IPayload";
import { generateToken } from "../utils/handleJwt";
import { responseStatus } from "../utils/response";

class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

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
      address: address,
      role: Number(role),
    };

    const token = generateToken(payload);

    res.cookie("authorization", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 30,
      sameSite: "strict",
    });

    try {
      responseStatus(
        res,
        "success",
        200,
        "Success",
      );
    } catch (error) {
      responseStatus(res, "error", 500, error.message);
    }
  }

  async deleteToken(res: Response) {
    res.clearCookie("authorization", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });
    responseStatus(res, "success", 200, "Logged out successfully");
  }

  async findByCitizenIdentification(
    res: Response,
    citizenIdentification: string
  ) {
    try {
      const user = await this.userRepository.findByCitizenIdentification(
        citizenIdentification
      );

      if (!user) {
        responseStatus(res, "error", 404, "User not found");
        return;
      }
      responseStatus(res, "success", 200, "User found successfully", user);
    } catch (e) {
      responseStatus(res, "error", 500, e.message);
    }
  }

  
}

export default new AuthService();
