import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from "typeorm";
import { Gender, Role, UserStatus } from "../utils/enum";
import { AccessLog } from "./AccessLog";
import { Appointment } from "./Appointment";
import { Permission } from "./Permission";
import { Visit } from "./Visit";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true, length: 43 })
  wallet_user: string;

  @Column({ length: 50 })
  full_name: string;

  @Column({ type: "date" })
  date_of_birth: Date;

  @Column({
    type: "enum",
    enum: Gender,
  })
  gender: Gender;

  @Column({ length: 13 })
  citizen_identification: string;

  @Column({ length: 12 })
  phone_number: string;

  @Column({
    type: "enum",
    enum: Role,
  })
  type: Role;

  @Column({ length: 10 })
  zip_code: string;

  @Column({ length: 30 })
  city: string;

  @Column({ length: 30 })
  state: string;

  @Column({ length: 100, nullable: true })
  email: string;

  @Column({
    type: "enum",
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  status: UserStatus;

  @CreateDateColumn()
  create_at: Timestamp;

  @UpdateDateColumn()
  update_at: Timestamp;

  // Relations
  @OneToMany(() => Visit, (visit) => visit.patient)
  patientVisits: Visit[];

  @OneToMany(() => Visit, (visit) => visit.doctor)
  doctorVisits: Visit[];

  @OneToMany(() => AccessLog, (accessLog) => accessLog.user)
  accessLogs: AccessLog[];

  @OneToMany(() => Appointment, (appointment) => appointment.patient)
  patientAppointments: Appointment[];

  @OneToMany(() => Appointment, (appointment) => appointment.doctor)
  doctorAppointments: Appointment[];

  @OneToMany(() => Permission, (permission) => permission.patient)
  patientPermissions: Permission[];

  @OneToMany(() => Permission, (permission) => permission.doctor)
  doctorPermissions: Permission[];
}
