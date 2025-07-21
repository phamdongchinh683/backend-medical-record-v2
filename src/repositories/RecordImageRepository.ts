import { RecordImage } from "../entities";
import { BaseRepository } from "./baseRepository";

export class RecordImageRepository extends BaseRepository<RecordImage> {
  constructor() {
    super(RecordImage);
  }
}
