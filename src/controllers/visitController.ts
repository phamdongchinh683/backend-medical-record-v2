import { Request, Response } from "express";
import visitService from "../services/visitService";
import { asyncHandler } from "../utils/response";

class VisitController {
  addVisit = asyncHandler(async (req: Request, res: Response) => {
    const { record } = req.body;
    await visitService.createVisit(record);
  });

  updateVisit = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { visit } = req.body;
    await visitService.updateVisit(id, visit);
  });
}

export default new VisitController();
