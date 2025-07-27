import { Response } from "express";
import { VisitRepository } from "../repositories/VisitRepository";
import { IVisit } from "../types/IVisit";
import { IVisitUpdate } from "../types/IVisitUpdate";
import { responseStatus } from "../utils/response";

class VisitService {
  constructor(private readonly visitRepository: VisitRepository) {}

  async createVisit(visit: IVisit, res: Response) {
    try {
      const result = await this.visitRepository.create(visit);
      if (!result) {
        responseStatus(res, "error", 400, "Failed to create visit");
        return;
      }
      responseStatus(res, "success", 201, "Visit created successfully");
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateVisit(id: string, visit: IVisitUpdate, res: Response) {
    try {
      const result = await this.visitRepository.update(id, visit);
      if (result.affected === 0) {
        responseStatus(res, "error", 400, "Failed to update visit");
        return;
      }
      responseStatus(res, "success", 200, "Visit updated successfully");
    } catch (error) {
      throw new Error(
        `Failed to update visit: ${
          error instanceof Error ? error.message : error
        }`
      );
    }
  }

  async visitByNftToken(nftToken: number, res: Response) {
    try {
      const result = await this.visitRepository.findVisitByNftToken(nftToken);
      if (!result) {
        responseStatus(res, "error", 404, "Visit not found");
        return;
      }
      responseStatus(res, "success", 200, "Visit fetched successfully", result);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteVisit(id: string, res: Response) {
    try {
      const result = await this.visitRepository.delete(id);
      if (result.affected === 0) {
        responseStatus(res, "error", 400, "Deleted before or not found");
        return;
      }
      responseStatus(res, "success", 200, "Visit deleted successfully");
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findVisitByNftToken(nftToken: number, res: Response) {
    try {
      const result = await this.visitRepository.findVisitByNftToken(nftToken);
      if (!result) {
        responseStatus(res, "error", 404, "Visit not found");
        return;
      }
      responseStatus(res, "success", 200, "Visit fetched successfully", result);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default new VisitService(new VisitRepository());
