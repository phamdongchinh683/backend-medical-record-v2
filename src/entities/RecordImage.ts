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
import { ImageType } from "../utils/enum";
import { Visit } from "./Visit";

@Index(["nft_token"])
@Entity("record_images")
export class RecordImage {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  nft_token: number;

  @Column({ length: 255 })
  image_url: string;

  @Column({
    type: "enum",
    enum: ImageType,
  })
  type: ImageType;

  @Column({ type: "text" })
  description: string;

  @CreateDateColumn()
  create_at: Timestamp;

  @UpdateDateColumn()
  update_at: Timestamp;

  // Relations
  @ManyToOne(() => Visit, (visit) => visit.recordImages)
  @JoinColumn({ name: "nft_token", referencedColumnName: "nft_token" })
  visit: Visit;
}
