import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
  Index,
} from "typeorm";
import { DiagnosisType } from "../utils/enum";
import { Visit } from "./Visit";

@Index(["nft_token"])
@Entity("diagnoses")
export class Diagnosis {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  nft_token: number;

  @Column({ length: 100 })
  diagnosis_name: string;

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
}
