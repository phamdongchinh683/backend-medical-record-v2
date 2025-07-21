import { LabResult } from "../entities";
import { BaseRepository } from "./baseRepository";

export class LabResultRepository extends BaseRepository<LabResult> {
  constructor() {
    super(LabResult);
  }
}
