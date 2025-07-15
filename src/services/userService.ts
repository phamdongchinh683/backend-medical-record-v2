import { Response } from "express";
import { UserRepository } from "../repositories/UserRepository";
import { IUser } from "../types/IUser";
import { responseStatus } from "../utils/response";

class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async register(res: Response, data: IUser) {
    const user = await this.userRepository.create(data);
    if (user) {
      responseStatus(res, "success", 201, "User created successfully");
    }
  }
}

export default new UserService(new UserRepository());
