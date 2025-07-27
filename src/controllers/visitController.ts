import { Request, Response } from "express";
import visitService from "../services/visitService";
import { asyncHandler } from "../utils/response";

class VisitController {
  addVisit = asyncHandler(async (req: Request, res: Response) => {
    await visitService.createVisit(req.body, res);
  });

  updateVisit = asyncHandler(async (req: Request, res: Response) => {
    await visitService.updateVisit(req.params.id, req.body, res);
  });

  deleteVisit = asyncHandler(async (req: Request, res: Response) => {
    await visitService.deleteVisit(req.params.id, res);
  });

  findVisitByNftToken = asyncHandler(async (req: Request, res: Response) => {
    await visitService.findVisitByNftToken(Number(req.params.nftToken), res);
  });

}

export default new VisitController();
