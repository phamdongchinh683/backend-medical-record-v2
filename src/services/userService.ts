import { Response } from "express";
import contract from "../config/contract";
import { UserRepository } from "../repositories/UserRepository";
import { IUser } from "../types/IUser";
import { IUserProfile } from "../types/IUserProfile";
import { responseStatus } from "../utils/response";

class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async register(res: Response, data: IUser): Promise<void> {
    const user = await this.userRepository.create(data);
    if (user) {
      responseStatus(res, "success", 201, "User created successfully");
    }
  }

  async profile(res: Response, address: string): Promise<void> {
    const user: IUserProfile = await this.userRepository.findUserByWallet(
      address
    );
    if (user) {
      responseStatus(res, "success", 200, "This is your my information", user);
      return;
    }
    responseStatus(res, "error", 400, "User not found");
  }

  async findByAddress(address: string): Promise<BigInt> {
    const user = await contract.roles(address);
    return user;
  }

  async getAllUsers(): Promise<any[]> {
    return await this.userRepository.findAll();
  }
}

export default new UserService(new UserRepository());
