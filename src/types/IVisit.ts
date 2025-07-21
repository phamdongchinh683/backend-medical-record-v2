import { VisitType } from "../utils/enum";

export interface IVisit {
  patient_id: string;
  doctor_id: string;
  visit_type: VisitType;
  nft_token: number;
  department: string;
  reason_for_visit: string;
  initial_diagnosis: string;
  visit_date: Date;
}
