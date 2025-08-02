import { Response } from "express";
import { DiagnosisRepository } from "../repositories/DiagnosisRepository";
import { IDiagnosis } from "../types/IDiagnosis";
import { IDiagnosisUpdate } from "../types/iDiagnosisUpdate";
import { DiagnosisType } from "../utils/enum";
import { responseStatus } from "../utils/response";

class DiagnosisService {
  constructor(private readonly diagnosisRepository: DiagnosisRepository) {}

  async create(diagnosis: IDiagnosis, res: Response) {
    try {
      let result = await this.diagnosisRepository.create(diagnosis);
      if (result) {
        responseStatus(res, "success", 200, "Diagnosis created");
      } else {
        responseStatus(res, "error", 400, "Diagnosis not created");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async update(id: string, diagnosis: IDiagnosisUpdate, res: Response) {
    try {
      let result = await this.diagnosisRepository.update(id, diagnosis);
      if (result.affected === 1) {
        responseStatus(res, "success", 200, "Diagnosis updated");
      } else {
        responseStatus(res, "error", 400, "Diagnosis not updated");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async detailDiagnosis(id: string, res: Response) {
    try {
      let result = await this.diagnosisRepository.detailDiagnosisById(id);
      if (result) {
        responseStatus(res, "success", 200, "Diagnosis", result);
      } else {
        responseStatus(res, "error", 400, "Diagnosis not found", result);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getByType(type: string, page: number, limit: number, res: Response) {
    try {
      let diagnosis = await this.diagnosisRepository.findByType(
        type as DiagnosisType,
        page,
        limit
      );
      if (diagnosis.total === 0) {
        responseStatus(res, "error", 400, "Current page is empty");
        return;
      }
      responseStatus(res, "success", 200, "Diagnosis", diagnosis);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async countDiagnosis(type: string, res: Response) {
    try {
      let count = await this.diagnosisRepository.countType(
        type as DiagnosisType
      );
      responseStatus(res, "success", 200, "Count diagnosis", count);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default new DiagnosisService(new DiagnosisRepository());
