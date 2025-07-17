import { User } from "../entities/User";
import { IUserProfile } from "../types/IUserProfile";
import { BaseRepository } from "./baseRepository";

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super(User);
  }

  async findUserByWallet(wallet: string): Promise<IUserProfile | null> {
    return await this.repo.findOne({
      where: { wallet_user: wallet },
      select: [
        "full_name",
        "phone_number",
        "zip_code",
        "gender",
        "type",
        "state",
        "city",
        "date_of_birth",
        "citizen_identification",
        "status",
      ],
    });
  }
}
0;
