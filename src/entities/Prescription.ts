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
import { Visit } from "./Visit";

@Entity("prescriptions")
export class Prescription {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  nft_token: number;

  @Column({ length: 30 })
  drug_name: string;

  @Column({ length: 20 })
  dosage: string;

  @Column({ length: 20 })
  frequency: string;

  @Column({ length: 20 })
  duration_days: string;

  @Column({ type: "date" })
  start_date: Date;

  @Column({ type: "date" })
  end_date: Date;

  @Column({ type: "text" })
  note: string;

  @CreateDateColumn()
  create_at: Timestamp;

  @UpdateDateColumn()
  update_at: Timestamp;

  // Relations
  @ManyToOne(() => Visit, (visit) => visit.prescriptions)
  @JoinColumn({ name: "nft_token", referencedColumnName: "nft_token" })
  visit: Visit;
}
