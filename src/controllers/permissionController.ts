import { Request, Response } from "express";
import permissionService from "../services/permissionService";
import { IUserRequest } from "../types/IUserRequest";
import { asyncHandler } from "../utils/response";

class PermissionController {
  addPermission = asyncHandler(async (req: Request, res: Response) => {
    await permissionService.add(req.body, res);
  });

  updatePermission = asyncHandler(async (req: Request, res: Response) => {
    await permissionService.update(req.params.id, req.body, res);
  });

  getPermissionByWallet = asyncHandler(
    async (req: IUserRequest, res: Response) => {
      await permissionService.get(
        req.address,
        parseInt(req.query.page as string) || 1,
        parseInt(req.query.limit as string) || 10,
        res
      );
    }
  );
}

export default new PermissionController();
