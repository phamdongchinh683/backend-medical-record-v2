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
import { ActionType } from "../utils/enum";
import { User } from "./User";
import { Visit } from "./Visit";

@Index(["nft_token"])
@Entity("access_logs")
export class AccessLog {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  user_id: string;

  @Column()
  nft_token: number;

  @Column({
    type: "enum",
    enum: ActionType,
  })
  action: ActionType;

  @CreateDateColumn()
  create_at: Timestamp;

  @UpdateDateColumn()
  update_at: Timestamp;

  @ManyToOne(() => User, (user) => user.accessLogs)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Visit, (visit) => visit.accessLogs)
  @JoinColumn({ name: "nft_token", referencedColumnName: "nft_token" })
  visit: Visit;
}
