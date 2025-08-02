import { Response } from "express";
import { LabResultRepository } from "../repositories/LabResultRepository";
import { ILabResult } from "../types/ILabResult";
import { responseStatus } from "../utils/response";
class LabResultService {
  constructor(private readonly labResultRepository: LabResultRepository) {}

  async addLabResult(data: ILabResult, res: Response) {
    try {
      const labResult = await this.labResultRepository.create(data);
      if (!labResult) {
        responseStatus(res, "error", 400, "Failed to add lab result");
        return;
      }
      responseStatus(res, "success", 200, "Lab result added successfully");
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateLabResult(id: string, data: Partial<ILabResult>, res: Response) {
    try {
      const labResult = await this.labResultRepository.update(id, data);
      if (labResult.affected == 0) {
        responseStatus(res, "error", 400, "Failed to update lab result");
        return;
      }
      responseStatus(res, "success", 200, "Lab result updated successfully");
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteLabResult(id: string, res: Response) {
    try {
      const labResult = await this.labResultRepository.delete(id);
      if (labResult.affected == 0) {
        responseStatus(res, "error", 400, "Failed to delete lab result");
        return;
      }
      responseStatus(res, "success", 200, "Lab result deleted successfully");
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findByNft(
    nftToken: number,
    page: number,
    limit: number,
    res: Response
  ) {
    try {
      const labResult = await this.labResultRepository.findLabResultsByNft(
        nftToken,
        page,
        limit > 100 ? 100 : limit
      );
      if (labResult.total == 0) {
        responseStatus(res, "error", 400, "Current page is empty");
        return;
      }
      responseStatus(
        res,
        "success",
        200,
        "Prescription found successfully",
        labResult
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default new LabResultService(new LabResultRepository());
