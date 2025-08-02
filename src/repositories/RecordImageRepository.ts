import { RecordImage } from "../entities";
import { IPaginationData } from "../types/IPaginationData";
import { BaseRepository } from "./baseRepository";

export class RecordImageRepository extends BaseRepository<RecordImage> {
  constructor() {
    super(RecordImage);
  }

  async findImagesByNft(
    ntfToken: number,
    page: number,
    limit: number
  ): Promise<IPaginationData> {
    let [result, total] = await this.repo.findAndCount({
      select: {
        id: true,
        image_url: true,
        type: true,
        description: true,
        create_at: true,
      },
      where: { nft_token: ntfToken },
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
