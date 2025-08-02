import NodeCache from "node-cache";
import { Diagnosis } from "../entities";
import { IDiagnosisDetail } from "../types/IDiagnosisDetail";
import { IPaginationData } from "../types/IPaginationData";
import { DiagnosisType } from "../utils/enum";
import { BaseRepository } from "./baseRepository";
const cache = new NodeCache();
export class DiagnosisRepository extends BaseRepository<Diagnosis> {
  constructor() {
    super(Diagnosis);
  }

  async findByType(
    type: DiagnosisType,
    page: number,
    limit: number
  ): Promise<IPaginationData> {
    let count = await this.countType(type);
    let result = await this.repo.find({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        type: type,
      },
      select: {
        id: true,
        diagnosis_name: true,
        type: true,
        create_at: true,
      },
      order: {
        create_at: "DESC",
      },
    });

    return {
      data: result,
      total: result.length,
      page: page,
      limit: limit,
      totalItems: count,
    };
  }

  async countType(type: DiagnosisType): Promise<number> {
    if (cache.get(`count_${type}`)) {
      return cache.get(`count_${type}`);
    } else {
      let count = await this.repo.count({
        where: {
          type: type,
        },
      });
      cache.set(`count_${type}`, count, 60 * 60);
      return count;
    }
  }

  async detailDiagnosisById(id: string): Promise<IDiagnosisDetail> {
    return await this.repo.findOne({
      where: {
        id: id,
      },
      select: {
        id: true,
        diagnosis_name: true,
        type: true,
        patient: {
          id: true,
          full_name: true,
        },
      },
      relations: {
        patient: true,
      },
    });
  }
}
