import { AccessLog } from "../entities";
import { BaseRepository } from "./baseRepository";

export class AccessLogRepository extends BaseRepository<AccessLog> {
  constructor() {
    super(AccessLog);
  }
}
