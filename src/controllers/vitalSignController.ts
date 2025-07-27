import { Request, Response } from "express";
import vitalSignService from "../services/vitalSignService";
import { asyncHandler } from "../utils/response";

class VitalSignController {
  addVitalSign = asyncHandler(async (req: Request, res: Response) => {
    await vitalSignService.createVitalSign(req.body, res);
  });

  updateVitalSign = asyncHandler(async (req: Request, res: Response) => {
    await vitalSignService.updateVitalSign(req.params.id, req.body, res);
  });

  deleteVitalSign = asyncHandler(async (req: Request, res: Response) => {
    await vitalSignService.deleteVitalSign(req.params.id, res);
  });

  findVitalSignByNft = asyncHandler(async (req: Request, res: Response) => {
    await vitalSignService.findVitalSignByNft(Number(req.params.nftToken), res);
  });
}

export default new VitalSignController();
