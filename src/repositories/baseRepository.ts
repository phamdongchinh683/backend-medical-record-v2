import { Repository } from "typeorm";
import { AppDataSource } from "../config/database";
import { IRepository } from "../types/IRepository";

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

  async update(id: string, data: any): Promise<T | null> {
    await this.repo.update(id, data);
    return this.repo.findOne({ where: { id } as any });
  }

  async findById(id: string): Promise<T | null> {
    return this.repo.findOne({ where: { id } as any });
  }

  async findAll(): Promise<T[]> {
    return await this.repo.find();
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
