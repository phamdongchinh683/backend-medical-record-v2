import { MedicalNote } from "../entities";
import { IMedicalNoteDetail } from "../types/IMedicalNoteDetail";
import { BaseRepository } from "./baseRepository";

export class MedicalNoteRepository extends BaseRepository<MedicalNote> {
  constructor() {
    super(MedicalNote);
  }

  async findMedicalNoteByNft(nft: number): Promise<IMedicalNoteDetail> {
    return await this.repo.findOne({
      where: {
        nft_token: nft,
      },
      select: {
        id: true,
        note: true,
        doctor: {
          id: true,
          full_name: true,
        },
      },
      relations: {
        doctor: true,
      },
    });
  }
}
