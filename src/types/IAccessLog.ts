import { ActionType } from "../utils/enum";

export interface IAccessLog {
  user_id: string;
  nft_token: number;
  action: ActionType;
}
