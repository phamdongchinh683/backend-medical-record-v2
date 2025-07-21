import { VisitType } from "../utils/enum";

export interface IVisitUpdate {
  visit_type: VisitType;
  nft_token: number;
  department: string;
  reason_for_visit: string;
  initial_diagnosis: string;
  visit_date: Date;
}
