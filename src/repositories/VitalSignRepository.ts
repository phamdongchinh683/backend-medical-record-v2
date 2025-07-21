import { VitalSigns } from "../entities";
import { BaseRepository } from "./baseRepository";

export class VitalSignRepository extends BaseRepository<VitalSigns> {
  constructor() {
    super(VitalSigns);
  }
}
