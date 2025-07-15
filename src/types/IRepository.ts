export interface IRepository<T> {
  create(data: any): Promise<T>;
  findAll(): Promise<T[]>;
  delete(id: string | number): Promise<void>;
}
