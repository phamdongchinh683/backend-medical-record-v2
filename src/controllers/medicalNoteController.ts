import { Request, Response } from "express";
import medicalNoteService from "../services/medicalNoteService";
import { asyncHandler } from "../utils/response";

class MedicalNoteController {
  createMedicalNote = asyncHandler(async (req: Request, res: Response) => {
    await medicalNoteService.createMedicalNote(req.body, res);
  });

  updateMedicalNote = asyncHandler(async (req: Request, res: Response) => {
    await medicalNoteService.updateMedicalNote(req.params.id, req.body, res);
  });

  findMedicalNoteByNft = asyncHandler(async (req: Request, res: Response) => {
    await medicalNoteService.findMedicalNoteByNft(
      Number(req.params.nftToken),
      res
    );
  });
}

export default new MedicalNoteController();
