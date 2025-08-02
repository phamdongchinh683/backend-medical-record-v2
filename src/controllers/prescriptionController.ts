import { Request, Response } from "express";
import prescriptionService from "../services/prescriptionService";
import { asyncHandler } from "../utils/response";

class PrescriptionController {
  addPrescription = asyncHandler(async (req: Request, res: Response) => {
    await prescriptionService.addPrescription(req.body, res);
  });

  updatePrescription = asyncHandler(async (req: Request, res: Response) => {
    await prescriptionService.updatePrescription(req.params.id, req.body, res);
  });

  deletePrescription = asyncHandler(async (req: Request, res: Response) => {
    await prescriptionService.deletePrescription(req.params.id, res);
  });

  findPrescriptionByNft = asyncHandler(async (req: Request, res: Response) => {
    await prescriptionService.findPrescriptionByNft(
      Number(req.params.nftToken),
      Number(req.query.page),
      Number(req.query.limit),
      res
    );
  });
}

export default new PrescriptionController();
