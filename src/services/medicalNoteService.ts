import { Response } from "express";
import { MedicalNoteRepository } from "../repositories/MedicalNoteRepository";
import { IMedicalNote } from "../types/IMedicalNote";
import { IMedicalNoteUpdate } from "../types/IMedicalNoteUpdate";
import { responseStatus } from "../utils/response";

class MedicalNoteService {
  constructor(private readonly medicalNoteRepository: MedicalNoteRepository) {}

  async createMedicalNote(medicalNote: IMedicalNote, res: Response) {
    try {
      const result = await this.medicalNoteRepository.create(medicalNote);
      if (!result) {
        responseStatus(res, "error", 400, "Failed to create medical note");
        return;
      }
      responseStatus(res, "success", 201, "Medical note created successfully");
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateMedicalNote(
    id: string,
    medicalNote: IMedicalNoteUpdate,
    res: Response
  ) {
    try {
      const result = await this.medicalNoteRepository.update(id, medicalNote);
      if (result.affected === 0) {
        responseStatus(res, "error", 400, "Updated before or not found");
        return;
      }
      responseStatus(res, "success", 200, "Medical note updated successfully");
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findMedicalNoteByNft(nft: number, res: Response) {
    try {
      const result = await this.medicalNoteRepository.findMedicalNoteByNft(nft);
      if (!result) {
        responseStatus(res, "error", 404, "Medical note not found");
        return;
      }
      responseStatus(
        res,
        "success",
        200,
        "Medical note found successfully",
        result
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default new MedicalNoteService(new MedicalNoteRepository());
