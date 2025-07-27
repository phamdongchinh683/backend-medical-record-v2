import { Visit } from "../entities";
import { IVisitDetail } from "../types/IVisitDetail";
import { BaseRepository } from "./baseRepository";

export class VisitRepository extends BaseRepository<Visit> {
  constructor() {
    super(Visit);
  }

  async findVisitByNftToken(nftToken: number): Promise<IVisitDetail> {
    return await this.repo.findOne({
      where: {
        nft_token: nftToken,
      },
      select: {
        id: true,
        nft_token: true,
        visit_type: true,
        department: true,
        visit_date: true,
        reason_for_visit: true,
        initial_diagnosis: true,
        patient: {
          id: true,
          full_name: true,
        },
        doctor: {
          id: true,
          full_name: true,
        },
      },
      relations: {
        patient: true,
        doctor: true,
      },
    });
  }
}
