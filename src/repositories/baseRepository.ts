import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { AppDataSource } from "../config/database";
import { IPaginationData } from "../types/IPaginationData";
import { IRepository } from "../types/IRepository";
import NodeCache = require("node-cache");
const cache = new NodeCache();
interface BaseEntity {
  id: string;
}

export class BaseRepository<T extends BaseEntity> implements IRepository<T> {
  protected repo: Repository<T>;

  constructor(entity: { new (): T }) {
    this.repo = AppDataSource.getRepository(entity);
  }

  async create(data: any): Promise<T> {
    return await this.repo.save(data);
  }

  async update(id: string, data: any): Promise<UpdateResult | null> {
    return await this.repo.update(id, data);
  }

  async findById(id: string): Promise<T | null> {
    return this.repo.findOne({ where: { id } as any });
  }

  async tableCount(tableName: string): Promise<number> {
    let cacheCountTable: unknown = cache.get(tableName);
    if (cacheCountTable) {
      return cacheCountTable as number;
    } else {
      let count = await this.repo.count();
      cache.set(tableName, count, 3600);
      return count;
    }
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.repo.delete(id);
  }

  async getPaginatedData(
    page: number,
    limit: number
  ): Promise<IPaginationData> {
    const [data, total] = await this.repo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    return {
      data,
      total: data.length,
      page,
      limit,
      totalItems: total,
    };
  }
}
