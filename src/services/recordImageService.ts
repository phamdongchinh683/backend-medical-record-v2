import { Response } from "express";
import { RecordImageRepository } from "../repositories/RecordImageRepository";
import { IRecordImage } from "../types/IRecordImage";
import { IRecordImageUpdate } from "../types/iRecordImageUpdate";
import { responseStatus } from "../utils/response";

class RecordImageService {
  constructor(private readonly recordImageRepository: RecordImageRepository) {}
  async addRecordImage(data: IRecordImage, res: Response) {
    try {
      let result = await this.recordImageRepository.create(data);
      if (!result) {
        responseStatus(res, "error", 400, "Failed to add record image");
        return;
      }
      responseStatus(res, "success", 201, "Record image added successfully");
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateRecordImage(id: string, data: IRecordImageUpdate, res: Response) {
    try {
      let result = await this.recordImageRepository.update(id, data);
      if (result.affected === 0) {
        responseStatus(res, "error", 400, "Failed to update record image");
        return;
      }
      responseStatus(res, "success", 200, "Record image updated successfully");
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteRecordImage(id: string, res: Response) {
    try {
      let result = await this.recordImageRepository.delete(id);
      if (result.affected === 0) {
        responseStatus(res, "error", 400, "Failed to delete record image");
        return;
      } else {
        responseStatus(
          res,
          "success",
          200,
          "Record image deleted successfully"
        );
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findRecordImageByNft(
    nft_token: number,
    page: number,
    limit: number,
    res: Response
  ) {
    try {
      let result = await this.recordImageRepository.findImagesByNft(
        nft_token,
        page,
        limit > 100 ? 100 : limit
      );
      if (result.total == 0) {
        responseStatus(res, "error", 400, "Current page is empty");
        return;
      }
      responseStatus(
        res,
        "success",
        200,
        "Record image found successfully",
        result
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default new RecordImageService(new RecordImageRepository());
