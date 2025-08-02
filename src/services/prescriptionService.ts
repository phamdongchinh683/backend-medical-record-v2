import { Response } from "express";
import { PrescriptionRepository } from "../repositories/PrescriptionRepository";
import { IPrescription } from "../types/IPrescription";
import { responseStatus } from "../utils/response";
class PrescriptionService {
  constructor(
    private readonly prescriptionRepository: PrescriptionRepository
  ) {}

  async addPrescription(data: IPrescription, res: Response) {
    try {
      const prescription = await this.prescriptionRepository.create(data);
      if (!prescription) {
        responseStatus(res, "error", 400, "Failed to add prescription");
        return;
      }
      responseStatus(res, "success", 200, "Prescription added successfully");
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updatePrescription(id: string, data: IPrescription, res: Response) {
    try {
      const prescription = await this.prescriptionRepository.update(id, data);
      if (prescription.affected == 0) {
        responseStatus(res, "error", 400, "Failed to update prescription");
        return;
      }
      responseStatus(res, "success", 200, "Prescription updated successfully");
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deletePrescription(id: string, res: Response) {
    try {
      const prescription = await this.prescriptionRepository.delete(id);
      if (prescription.affected == 0) {
        responseStatus(res, "error", 400, "Failed to delete prescription");
        return;
      }
      responseStatus(res, "success", 200, "Prescription deleted successfully");
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findPrescriptionByNft(
    nftToken: number,
    page: number,
    limit: number,
    res: Response
  ) {
    try {
      const prescription = await this.prescriptionRepository.findByNft(
        nftToken,
        page,
        limit > 100 ? 100 : limit
      );
      if (prescription.total == 0) {
        responseStatus(res, "error", 400, "Current page is empty");
        return;
      }
      responseStatus(
        res,
        "success",
        200,
        "Prescription found successfully",
        prescription
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default new PrescriptionService(new PrescriptionRepository());
