import { Request, Response } from "express";
import recordImageService from "../services/recordImageService";
import { asyncHandler } from "../utils/response";

class RecordImageController {
  addRecordImage = asyncHandler(async (req: Request, res: Response) => {
    await recordImageService.addRecordImage(req.body, res);
  });

  deleteRecordImage = asyncHandler(async (req: Request, res: Response) => {
    await recordImageService.deleteRecordImage(req.params.id, res);
  });

  updateRecordImage = asyncHandler(async (req: Request, res: Response) => {
    await recordImageService.updateRecordImage(req.params.id, req.body, res);
  });

  findRecordImageByNft = asyncHandler(async (req: Request, res: Response) => {
    await recordImageService.findRecordImageByNft(
      Number(req.params.nftToken),
      Number(req.query.page) || 1,
      Number(req.query.limit) || 10,
      res
    );
  });
}

export default new RecordImageController();
