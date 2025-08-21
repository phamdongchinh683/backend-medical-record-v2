import { Request, Response } from "express";
import diagnosisService from "../services/diagnosisService";
import { asyncHandler } from "../utils/response";

class DiagnosisController {
  addDiagnosis = asyncHandler(async (req: Request, res: Response) => {
    await diagnosisService.create(req.body, res);
  });

  updateDiagnosis = asyncHandler(async (req: Request, res: Response) => {
    await diagnosisService.update(req.params.id, req.body, res);
  });

  getDiagnosis = asyncHandler(async (req: Request, res: Response) => {
    await diagnosisService.detailDiagnosis(req.params.id, res);
  });

  diagnosisCount = asyncHandler(async (req: Request, res: Response) => {
    await diagnosisService.countDiagnosis(req.params.type, res);
  });

  getDiagnosisByType = asyncHandler(async (req: Request, res: Response) => {
    await diagnosisService.getByType(
      req.query.type as string,
      parseInt(req.query.page as string) || 1,
      parseInt(req.query.limit as string) || 10,
      res
    );
  });
}

export default new DiagnosisController();
