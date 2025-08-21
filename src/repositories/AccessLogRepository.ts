import { AccessLog } from "../entities";
import { IPaginationData } from "../types/IPaginationData";
import { BaseRepository } from "./baseRepository";

export class AccessLogRepository extends BaseRepository<AccessLog> {
  constructor() {
    super(AccessLog);
  }

  async findAccessLogByNftToken(
    nftToken: number,
    page: number,
    limit: number
  ): Promise<IPaginationData> {
    let [result, total] = await this.repo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        nft_token: nftToken,
      },
      select: {
        id: true,
        nft_token: true,
        action: true,
        create_at: true,
        user: {
          id: true,
          full_name: true,
        },
      },
      relations: {
        user: true,
      },
      order: {
        create_at: "DESC",
      },
    });

    return {
      data: result,
      total: result.length,
      page,
      limit,
      totalItems: total,
    };
  }

  async findAccessLogByWallet(
    wallet: string,
    page: number,
    limit: number
  ): Promise<IPaginationData> {
    let [result, total] = await this.repo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        nft_token: true,
        action: true,
        create_at: true,
        user: {
          id: true,
          full_name: true,
        },
      },
      where: {
        user: {
          wallet_user: wallet,
        },
      },
    });
    return {
      data: result,
      total: result.length,
      page,
      limit,
      totalItems: total,
    };
  }
}
