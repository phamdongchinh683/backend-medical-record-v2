import { Prescription } from "../entities";
import { BaseRepository } from "./baseRepository";

export class PrescriptionRepository extends BaseRepository<Prescription> {
  constructor() {
    super(Prescription);
  }
}