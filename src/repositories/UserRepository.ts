import { UpdateResult } from "typeorm";
import { User } from "../entities/User";
import { IUserProfile } from "../types/IUserProfile";
import { IUserUpdate } from "../types/IUserUpdate";
import { Gender, Role, UserStatus } from "../utils/enum";
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

  async updateUserByWallet(
    wallet: string,
    data: IUserUpdate
  ): Promise<UpdateResult> {
    return await this.repo.update(
      { wallet_user: wallet },
      {
        full_name: data.full_name,
        phone_number: data.phone_number,
        zip_code: data.zip_code,
        gender: data.gender as Gender,
        type: data.type as Role,
        citizen_identification: data.citizen_identification,
        city: data.city,
        state: data.state,
        date_of_birth: data.date_of_birth,
        update_at: new Date(),
      }
    );
  }

  async updateStatus(
    wallet: string,
    data: { status: UserStatus }
  ): Promise<UpdateResult> {
    return await this.repo.update(
      { wallet_user: wallet },
      { status: data.status }
    );
  }
}
0;
