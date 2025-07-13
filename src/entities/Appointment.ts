import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from "typeorm";
import { AppointmentStatus } from "../utils/enum";
import { User } from "./User";

@Entity("appointments")
export class Appointment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 60 })
  wallet_user_patient: string;

  @Column({ length: 60 })
  wallet_user_doctor: string;

  @Column({ type: "timestamp" })
  date_time: Date;

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
