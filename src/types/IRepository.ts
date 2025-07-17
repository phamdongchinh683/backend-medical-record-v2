export interface IRepository<T> {
  create(data: any): Promise<T>;
  findAll(): Promise<T[]>;
  update(id: string, data: any): Promise<T | null>;
  findById(id: string): Promise<T | null>;
  delete(id: string): Promise<void>;
}
