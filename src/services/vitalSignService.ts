import { Response } from "express";
import { VitalSignRepository } from "../repositories/VitalSignRepository";
import { IVitalSign } from "../types/IVitalsign";
import { IVitalSignUpdate } from "../types/IVitalSignUpdate";
import { responseStatus } from "../utils/response";

class VitalSignService {
  constructor(private readonly vitalSignRepository: VitalSignRepository) {}

  async createVitalSign(vitalSign: IVitalSign, res: Response) {
    try {
      const result = await this.vitalSignRepository.create(vitalSign);
      if (!result) {
        responseStatus(res, "error", 400, "Failed to create vital sign");
        return;
      }
      responseStatus(res, "success", 200, "Vital sign created successfully");
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateVitalSign(
    id: string,
    vitalSign: IVitalSignUpdate,
    res: Response
  ) {
    try {
      const result = await this.vitalSignRepository.updateVitalSign(
        id,
        vitalSign
      );
      if (result.affected === 0) {
        responseStatus(res, "error", 400, "Updated before or not found");
        return;
      }
      responseStatus(res, "success", 200, "Vital sign updated successfully");
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findVitalSignByNft(nft: number, res: Response) {
    try {
      const result = await this.vitalSignRepository.findVitalSignByNft(nft);
      if (!result) {
        responseStatus(res, "error", 404, "Vital sign not found");
        return;
      }
      responseStatus(
        res,
        "success",
        200,
        "Vital sign fetched successfully",
        result
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteVitalSign(id: string, res: Response) {
    try {
      const result = await this.vitalSignRepository.delete(id);
      if (result.affected === 0) {
        responseStatus(res, "error", 400, "Deleted before or not found");
        return;
      }
      responseStatus(res, "success", 200, "Vital sign deleted successfully");
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default new VitalSignService(new VitalSignRepository());
