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
import { Visit } from "./Visit";

@Entity("vital_signs")
@Unique("UQ_VITAL_SIGN_NFT_TOKEN", ["nft_token"])
@Index(["nft_token"], {
  unique: true,
})
export class VitalSigns {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  nft_token: number;

  @Column({ type: "decimal", precision: 4, scale: 1 })
  temperature: number;

  @Column()
  heart_rate: number;

  @Column()
  respiratory_rate: number;

  @Column({ type: "decimal", precision: 5, scale: 2 })
  weight: number;

  @Column({ type: "decimal", precision: 5, scale: 2 })
  height: number;

  @CreateDateColumn()
  create_at: Timestamp;

  @UpdateDateColumn()
  update_at: Timestamp;

  @ManyToOne(() => Visit, (visit) => visit.vitalSigns)
  @JoinColumn({ name: "nft_token", referencedColumnName: "nft_token" })
  visit: Visit;
}
