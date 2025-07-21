import { Visit } from "../entities";
import { BaseRepository } from "./baseRepository";

export class VisitRepository extends BaseRepository<Visit> {
  constructor() {
    super(Visit);
  }
}
