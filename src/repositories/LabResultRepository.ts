import { LabResult } from "../entities";
import { IPaginationData } from "../types/IPaginationData";
import { BaseRepository } from "./baseRepository";

export class LabResultRepository extends BaseRepository<LabResult> {
  constructor() {
    super(LabResult);
  }

  async findLabResultsByNft(
    nft: number,
    page: number,
    limit: number
  ): Promise<IPaginationData> {
    const [result, total] = await this.repo.findAndCount({
      select: {
        id: true,
        nft_token: true,
        test_type: true,
        result: true,
        test_date: true,
      },
      skip: (page - 1) * limit,
      take: limit,
      where: {
        nft_token: nft,
      },
      order: {
        test_date: "DESC",
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
