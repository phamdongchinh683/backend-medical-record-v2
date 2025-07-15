import { Repository } from "typeorm";
import { AppDataSource } from "../config/database";
import { IRepository } from "../types/IRepository";
export class BaseRepository<T> implements IRepository<T> {
  protected repo: Repository<T>;

  constructor(entity: { new (): T }) {
    this.repo = AppDataSource.getRepository(entity);
  }

  async create(data: any): Promise<T> {
    return await this.repo.save(data);
  }

  async findAll(): Promise<T[]> {
    return await this.repo.find();
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
