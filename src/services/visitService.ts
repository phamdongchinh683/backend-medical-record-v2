import { VisitRepository } from "../repositories/VisitRepository";
import { IVisit } from "../types/IVisit";
import { IVisitUpdate } from "../types/IVisitUpdate";

class VisitService {
  constructor(private readonly visitRepository: VisitRepository) {}

  async createVisit(visit: IVisit) {
    try {
      const result = await this.visitRepository.create(visit);
      return result;
    } catch (error) {
      throw new Error(
        `Failed to create visit: ${
          error instanceof Error ? error.message : error
        }`
      );
    }
  }

  async updateVisit(id: string, visit: IVisitUpdate) {
    try {
      const result = await this.visitRepository.update(id, visit);
      return result;
    } catch (error) {
      throw new Error(
        `Failed to update visit: ${
          error instanceof Error ? error.message : error
        }`
      );
    }
  }
}

export default new VisitService(new VisitRepository());
