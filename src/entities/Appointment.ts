import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  Unique,
  UpdateDateColumn,
} from "typeorm";
import { AppointmentStatus } from "../utils/enum";
import { User } from "./User";

@Entity("appointments")
@Unique("UQ_APPOINTMENT_DATETIME_DOCTOR_PATIENT", [
  "date_time",
  "wallet_user_doctor",
  "wallet_user_patient",
])
@Index(["date_time", "wallet_user_doctor", "wallet_user_patient"])
export class Appointment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 60 })
  wallet_user_patient: string;

  @Column({ length: 60 })
  wallet_user_doctor: string;

  @Column({ type: "timestamp" })
  date_time: Timestamp;

  @Column({
    type: "enum",
    enum: AppointmentStatus,
    default: AppointmentStatus.PENDING,
  })
  status: AppointmentStatus;

  @CreateDateColumn()
  create_at: Timestamp;

  @UpdateDateColumn()
  update_at: Timestamp;

  // Relations
  @ManyToOne(() => User, (user) => user.patientAppointments)
  @JoinColumn({
    name: "wallet_user_patient",
    referencedColumnName: "wallet_user",
  })
  patient: User;

  @ManyToOne(() => User, (user) => user.doctorAppointments)
  @JoinColumn({
    name: "wallet_user_doctor",
    referencedColumnName: "wallet_user",
  })
  doctor: User;
}
