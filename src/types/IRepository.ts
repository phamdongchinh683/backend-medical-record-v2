import { DeleteResult, UpdateResult } from "typeorm";

export interface IRepository<T> {
  create(data: any): Promise<T>;
  tableCount(): Promise<number>;
  update(id: string, data: any): Promise<UpdateResult | null>;
  findById(id: string): Promise<T | null>;
  delete(id: string): Promise<DeleteResult>;
}
