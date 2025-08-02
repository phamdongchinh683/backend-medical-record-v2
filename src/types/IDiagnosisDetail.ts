export interface IDiagnosisDetail {
  id: string;
  diagnosis_name: string;
  type: string;
  patient: {
    id: string;
    full_name: string;
  };
}
