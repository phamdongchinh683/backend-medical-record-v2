import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from "typeorm";
import { VisitType } from "../utils/enum";
import { AccessLog } from "./AccessLog";
import { Diagnosis } from "./Diagnosis";
import { LabResult } from "./LabResult";
import { MedicalNote } from "./MedicalNote";
import { Prescription } from "./Prescription";
import { RecordImage } from "./RecordImage";
import { User } from "./User";
import { VitalSigns } from "./VitalSigns";

@Entity("visits")
export class Visit {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  patient_id: string;

  @Column()
  doctor_id: string;

  @Column({
    type: "enum",
    enum: VisitType,
  })
  visit_type: VisitType;

  @Column({ unique: true })
  nft_token: number;

  @Column({ length: 60 })
  department: string;

  @Column({ type: "text" })
  reason_for_visit: string;

  @Column({ type: "text" })
  initial_diagnosis: string;

  @Column({ type: "timestamp" })
  visit_date: Date;

  @CreateDateColumn()
  create_at: Timestamp;

  @UpdateDateColumn()
  update_at: Timestamp;

  @ManyToOne(() => User, (user) => user.patientVisits)
  @JoinColumn({ name: "patient_id" })
  patient: User;

  @ManyToOne(() => User, (user) => user.doctorVisits)
  @JoinColumn({ name: "doctor_id" })
  doctor: User;

  @OneToMany(() => VitalSigns, (vitalSigns) => vitalSigns.visit)
  vitalSigns: VitalSigns[];

  @OneToMany(() => LabResult, (labResult) => labResult.visit)
  labResults: LabResult[];

  @OneToMany(() => Diagnosis, (diagnosis) => diagnosis.visit)
  diagnoses: Diagnosis[];

  @OneToMany(() => Prescription, (prescription) => prescription.visit)
  prescriptions: Prescription[];

  @OneToMany(() => RecordImage, (recordImage) => recordImage.visit)
  recordImages: RecordImage[];

  @OneToMany(() => MedicalNote, (medicalNote) => medicalNote.visit)
  medicalNotes: MedicalNote[];

  @OneToMany(() => AccessLog, (accessLog) => accessLog.visit)
  accessLogs: AccessLog[];
}
