import { VitalSigns } from "../entities";
import { IVitalSignUpdate } from "../types/IVitalSignUpdate";
import { BaseRepository } from "./baseRepository";

export class VitalSignRepository extends BaseRepository<VitalSigns> {
  constructor() {
    super(VitalSigns);
  }

  async findVitalSignByNft(nft: number) {
    return await this.repo.findOne({
      where: {
        nft_token: nft,
      },
      select: {
        id: true,
        nft_token: true,
        temperature: true,
        heart_rate: true,
        respiratory_rate: true,
        weight: true,
        height: true,
      },
    });
  }

  async updateVitalSign(id: string, vitalSign: IVitalSignUpdate) {
    return await this.repo.update(
      {
        id: id,
      },
      {
        temperature: vitalSign.temperature,
        heart_rate: vitalSign.heart_rate,
        respiratory_rate: vitalSign.respiratory_rate,
        weight: vitalSign.weight,
        height: vitalSign.height,
      }
    );
  }
}
