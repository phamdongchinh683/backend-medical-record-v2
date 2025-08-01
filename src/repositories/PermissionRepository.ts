import { Permission } from "../entities";
import { IPaginationData } from "../types/IPaginationData";
import { BaseRepository } from "./baseRepository";

export class PermissionRepository extends BaseRepository<Permission> {
  constructor() {
    super(Permission);
  }

  async getPermissionByWallet(
    wallet: string,
    page: number,
    limit: number
  ): Promise<IPaginationData> {
    const [result, total] = await this.repo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: {
        create_at: "DESC",
      },
      where: {
        wallet_user_patient: wallet,
      },
      select: {
        id: true,
        status: true,
        doctor: {
          id: true,
          full_name: true,
        },
        patient: {
          id: true,
          full_name: true,
        },
        create_at: true,
      },
      relations: {
        doctor: true,
        patient: true,
      },
    });

    return {
      data: result.length > 0 ? result : [],
      total,
      page,
      limit,
      totalItems: total,
    };
  }
}
