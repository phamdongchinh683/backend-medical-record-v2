import { Gender, Role, UserStatus } from "../utils/enum";

export interface IUser {
  wallet_user: string;
  full_name: string;
  date_of_birth: Date;
  gender: string;
  citizen_identification: string;
  phone_number: string;
  type: string;
  zip_code: string;
  city: string;
  state: string;
}
