import { Diagnosis } from "../entities";
import { BaseRepository } from "./baseRepository";

export class DiagnosisRepository extends BaseRepository<Diagnosis> {
  constructor() {
    super(Diagnosis);
  }
}
