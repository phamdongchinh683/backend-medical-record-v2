import { Prescription } from "../entities";
import { IPaginationData } from "../types/IPaginationData";
import { BaseRepository } from "./baseRepository";

export class PrescriptionRepository extends BaseRepository<Prescription> {
  constructor() {
    super(Prescription);
  }

  async findByNft(
    nftToken: number,
    page: number,
    limit: number
  ): Promise<IPaginationData> {
    const [result, total] = await this.repo.findAndCount({
      select: {
        id: true,
        nft_token: true,
        drug_name: true,
        dosage: true,
        frequency: true,
        duration_days: true,
        start_date: true,
        end_date: true,
        note: true,
        create_at: true,
      },
      where: {
        nft_token: nftToken,
      },
      order: {
        create_at: "DESC",
      },
      skip: (page - 1) * limit,
      take: limit,
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
