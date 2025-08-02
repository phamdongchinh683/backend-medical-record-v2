import { Request, Response } from "express";
import labResultService from "../services/labResultService";
import { asyncHandler } from "../utils/response";

class LabResultController {
  addLabResult = asyncHandler(async (req: Request, res: Response) => {
    await labResultService.addLabResult(req.body, res);
  });

  updateLabResult = asyncHandler(async (req: Request, res: Response) => {
    await labResultService.updateLabResult(req.params.id, req.body, res);
  });

  deleteLabResult = asyncHandler(async (req: Request, res: Response) => {
    await labResultService.deleteLabResult(req.params.id, res);
  });

  findByNft = asyncHandler(async (req: Request, res: Response) => {
    await labResultService.findByNft(
      Number(req.params.nftToken),
      Number(req.query.page),
      Number(req.query.limit),
      res
    );
  });
}

export default new LabResultController();
