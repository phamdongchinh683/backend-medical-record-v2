import { AppointmentStatus } from "../utils/enum";

export interface IAppointment {
  wallet_user_patient: string;
  wallet_user_doctor: string;
  date_time: Date;
  status?: AppointmentStatus;
}

export interface IAppointmentUpdate {
  date_time?: Date;
  status?: AppointmentStatus;
}
