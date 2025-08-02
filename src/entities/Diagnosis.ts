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
import { DiagnosisType } from "../utils/enum";
import { User } from "./User";
import { Visit } from "./Visit";

@Unique("UQ_DIAGNOSIS_NFT_TOKEN", ["nft_token"])
@Index(["nft_token", "type"])
@Entity("diagnoses")
export class Diagnosis {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  nft_token: number;

  @Column({ length: 100 })
  diagnosis_name: string;

  @Column({ length: 43 })
  wallet_patient: string;

  @Column({
    type: "enum",
    enum: DiagnosisType,
  })
  type: DiagnosisType;

  @CreateDateColumn()
  create_at: Timestamp;

  @UpdateDateColumn()
  update_at: Timestamp;

  // Relations
  @ManyToOne(() => Visit, (visit) => visit.diagnoses)
  @JoinColumn({ name: "nft_token", referencedColumnName: "nft_token" })
  visit: Visit;

  @ManyToOne(() => User, (user) => user.patientDiagnoses)
  @JoinColumn({ name: "wallet_patient", referencedColumnName: "wallet_user" })
  patient: User;
}
