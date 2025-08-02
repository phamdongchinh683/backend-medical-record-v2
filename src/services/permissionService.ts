import { Response } from "express";
import { PermissionRepository } from "../repositories/PermissionRepository";
import { IPermission } from "../types/IPermission";
import { IPermissionUpdate } from "../types/IPermissionUpdate";
import { responseStatus } from "../utils/response";
class PermissionService {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async add(permission: IPermission, res: Response) {
    try {
      const result = await this.permissionRepository.create(permission);
      if (!result) {
        responseStatus(res, "error", 400, "Failed to create permission");
        return;
      }
      responseStatus(res, "success", 201, "Permission created successfully");
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async update(id: string, data: IPermissionUpdate, res: Response) {
    try {
      const result = await this.permissionRepository.update(id, data);
      if (result.affected === 0) {
        responseStatus(res, "error", 400, "Failed to update permission");
        return;
      }
      responseStatus(
        res,
        "success",
        200,
        "appointment permission successfully"
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async get(wallet: string, page: number, limit: number, res: Response) {
    try {
      const result = await this.permissionRepository.getPermissionByWallet(
        wallet,
        page,
        limit > 100 ? 100 : limit
      );
      if (result.total === 0) {
        responseStatus(res, "error", 404, "Current page is empty");
        return;
      }
      responseStatus(
        res,
        "success",
        200,
        "Permission fetched successfully",
        result
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default new PermissionService(new PermissionRepository());
