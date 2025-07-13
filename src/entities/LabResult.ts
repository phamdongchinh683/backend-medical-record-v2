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
import { TestType } from "../utils/enum";
import { Visit } from "./Visit";

@Entity("lab_results")
export class LabResult {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  nft_token: number;

  @Column({
    type: "enum",
    enum: TestType,
  })
  test_type: TestType;

  @Column({ type: "text" })
  result: string;

  @Column({ type: "timestamp" })
  test_date: Date;

  @CreateDateColumn()
  create_at: Timestamp;

  @UpdateDateColumn()
  update_at: Timestamp;

  // Relations
  @ManyToOne(() => Visit, (visit) => visit.labResults)
  @JoinColumn({ name: "nft_token", referencedColumnName: "nft_token" })
  visit: Visit;
}
