import { AccessLogRepository } from "../repositories/AccessLogRepository";

class AccessLogService {
  private readonly accessLogRepository: AccessLogRepository;

  constructor() {
    this.accessLogRepository = new AccessLogRepository();
  }

  
}

export default new AccessLogService();