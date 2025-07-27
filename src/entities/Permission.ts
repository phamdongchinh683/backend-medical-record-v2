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
import { PermissionStatus } from "../utils/enum";
import { User } from "./User";

@Entity("permissions")
@Unique("UQ_PERMISSION_WALLET_USER_PATIENT_DOCTOR", [
  "wallet_user_patient",
  "wallet_user_doctor",
])
@Index(["wallet_user_patient", "wallet_user_doctor"])
export class Permission {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 60 })
  wallet_user_patient: string;

  @Column({ length: 60 })
  wallet_user_doctor: string;

  @Column({
    type: "enum",
    enum: PermissionStatus,
  })
  status: PermissionStatus;

  @CreateDateColumn()
  create_at: Timestamp;

  @UpdateDateColumn()
  update_at: Timestamp;

  // Relations
  @ManyToOne(() => User, (user) => user.patientPermissions)
  @JoinColumn({
    name: "wallet_user_patient",
    referencedColumnName: "wallet_user",
  })
  patient: User;

  @ManyToOne(() => User, (user) => user.doctorPermissions)
  @JoinColumn({
    name: "wallet_user_doctor",
    referencedColumnName: "wallet_user",
  })
  doctor: User;
}
