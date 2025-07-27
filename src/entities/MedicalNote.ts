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
import { User } from "./User";
import { Visit } from "./Visit";

@Index(["nft_token"])
@Unique("UQ_MEDICAL_NOTE_NFT_TOKEN", ["nft_token"])
@Entity("medical_notes")
export class MedicalNote {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  nft_token: number;

  @Column()
  doctor_id: string;

  @Column({ type: "text" })
  note: string;

  @CreateDateColumn()
  create_at: Timestamp;

  @UpdateDateColumn()
  update_at: Timestamp;

  // Relations
  @ManyToOne(() => Visit, (visit) => visit.medicalNotes)
  @JoinColumn({ name: "nft_token", referencedColumnName: "nft_token" })
  visit: Visit;

  @ManyToOne(() => User)
  @JoinColumn({ name: "doctor_id" })
  doctor: User;
}
