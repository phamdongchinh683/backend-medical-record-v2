export interface IVisitDetail {
  id: string;
  nft_token: number;
  visit_type: string;
  department: string;
  visit_date: Date;
  reason_for_visit: string;
  initial_diagnosis: string;
  patient: {
    id: string;
    full_name: string;
  };
  doctor: {
    id: string;
    full_name: string;
  };
}
