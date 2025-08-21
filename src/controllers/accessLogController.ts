import { Request, Response } from "express";
import accessLogService from "../services/accessLogService";
import { IUserRequest } from "../types/IUserRequest";
import { asyncHandler } from "../utils/response";
class AccessLogController {
  addAccessLog = asyncHandler(async (req: Request, res: Response) => {
    await accessLogService.create(req.body, res);
  });

  getAccessLogByNftToken = asyncHandler(async (req: Request, res: Response) => {
    await accessLogService.findByNftToken(
      Number(req.params.nftToken),
      parseInt(req.query.page as string) || 1,
      parseInt(req.query.limit as string) || 10,
      res
    );
  });

  getAccessLogByWallet = asyncHandler(
    async (req: IUserRequest, res: Response) => {
      await accessLogService.findByWallet(
        req.user.address,
        parseInt(req.query.page as string) || 1,
        parseInt(req.query.limit as string) || 10,
        res
      );
    }
  );
}

export default new AccessLogController();
