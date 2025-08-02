export interface IMedicalNoteDetail {
  id: string;
  note: string;
  doctor: {
    id: string;
    full_name: string;
  };
}
