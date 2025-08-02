import { Appointment } from "../entities";
import { IPaginationData } from "../types/IPaginationData";
import { BaseRepository } from "./baseRepository";

export class AppointmentRepository extends BaseRepository<Appointment> {
  constructor() {
    super(Appointment);
  }

  async findAppointmentsByWallet(
    wallet: string,
    limit: number,
    page: number
  ): Promise<IPaginationData> {
    let [result, total] = await this.repo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: {
        date_time: "ASC",
      },
      where: {
        wallet_user_patient: wallet,
      },
      select: {
        id: true,
        date_time: true,
        status: true,
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

    return {
      data: result,
      total: result.length,
      page,
      limit,
      totalItems: total,
    };
  }
}
