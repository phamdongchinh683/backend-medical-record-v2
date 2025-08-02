import { Response } from "express";
import { AccessLogRepository } from "../repositories/AccessLogRepository";
import { IAccessLog } from "../types/IAccessLog";
import { responseStatus } from "../utils/response";
class AccessLogService {
  constructor(private readonly accessLogRepository: AccessLogRepository) {}

  async create(accessLog: IAccessLog, res: Response) {
    try {
      const result = await this.accessLogRepository.create(accessLog);
      if (!result) {
        responseStatus(res, "error", 400, "Failed to create access log");
        return;
      }
      responseStatus(res, "success", 201, "Access log created successfully");
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findByNftToken(
    nftToken: number,
    page: number,
    limit: number,
    res: Response
  ) {
    try {
      const result = await this.accessLogRepository.findAccessLogByNftToken(
        nftToken,
        page,
        limit > 100 ? 100 : limit
      );
      if (!result) {
        responseStatus(res, "error", 404, "Access log not found");
        return;
      }
      responseStatus(
        res,
        "success",
        200,
        "Access log fetched successfully",
        result
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default new AccessLogService(new AccessLogRepository());
