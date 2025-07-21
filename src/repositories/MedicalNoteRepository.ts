import { MedicalNote } from "../entities";
import { BaseRepository } from "./baseRepository";

export class MedicalNoteRepository extends BaseRepository<MedicalNote> {
  constructor() {
    super(MedicalNote);
  }
}
