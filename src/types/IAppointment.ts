import { Timestamp } from "typeorm";

export interface IAppointment {
  id: string;
  date_time: Timestamp;
  status: string;
  patient: {
    id: string;
    full_name: string;
  };
  doctor: {
    id: string;
    full_name: string;
  };
}
