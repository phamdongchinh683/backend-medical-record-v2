import { AppDataSource } from "../config/database";
import { AccessLog, Diagnosis, RecordImage, VitalSigns } from "../entities";
import { Visit } from "../entities/Visit";
import { AccessLogRepository } from "../repositories/AccessLogRepository";
import { DiagnosisRepository } from "../repositories/DiagnosisRepository";
import { MedicalNoteRepository } from "../repositories/MedicalNoteRepository";
import { PrescriptionRepository } from "../repositories/PrescriptionRepository";
import { RecordImageRepository } from "../repositories/RecordImageRepository";
import { VisitRepository } from "../repositories/VisitRepository";
import { VitalSignRepository } from "../repositories/VitalSignRepository";

export class DoctorService {
  private readonly recordImageRepository: RecordImageRepository;
  private readonly visitRepository: VisitRepository;
  private readonly vitalSignRepository: VitalSignRepository;
  private readonly accessLogRepository: AccessLogRepository;
  private readonly diagnosisRepository: DiagnosisRepository;
  private readonly medicalNoteRepository: MedicalNoteRepository;
  private readonly prescriptionRepository: PrescriptionRepository;
  constructor() {
    this.recordImageRepository = new RecordImageRepository();
    this.visitRepository = new VisitRepository();
    this.vitalSignRepository = new VitalSignRepository();
    this.accessLogRepository = new AccessLogRepository();
    this.diagnosisRepository = new DiagnosisRepository();
    this.medicalNoteRepository = new MedicalNoteRepository();
    this.prescriptionRepository = new PrescriptionRepository();
  }

  async createRecord(record: any) {
    try {
      const result = await AppDataSource.manager.transaction(
        async (transaction) => {
          const recordImage = await transaction.save(
            RecordImage,
            record.recordImage
          );
          const visit = await transaction.save(Visit, record.visit);
          const vitalSign = await transaction.save(
            VitalSigns,
            record.vitalSign
          );
          const accessLog = await transaction.save(AccessLog, record.accessLog);
          const diagnosis = await transaction.save(Diagnosis, record.diagnosis);
          return { recordImage, visit, vitalSign, accessLog, diagnosis };
        }
      );
      return result;
    } catch (error) {
      throw new Error(
        `Failed to create record: ${
          error instanceof Error ? error.message : error
        }`
      );
    }
    
  }

  async detailRecord(id: string) {}

  async getRecordImage(ntfToken: number) {}
}
