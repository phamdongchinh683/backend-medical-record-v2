import { User } from "../entities/User";
import { BaseRepository } from "./baseRepository";

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super(User);
  }
}
