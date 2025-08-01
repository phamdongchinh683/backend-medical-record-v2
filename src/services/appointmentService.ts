import { Response } from "express";
import { AppointmentRepository } from "../repositories/AppointmentRepository";
import { IAppointment } from "../types/IAppointment";
import { responseStatus } from "../utils/response";
class AppointmentService {
  constructor(private readonly appointmentRepository: AppointmentRepository) {}

  async create(appointment: IAppointment, res: Response) {
    try {
      const result = await this.appointmentRepository.create(appointment);
      if (!result) {
        responseStatus(res, "error", 400, "Failed to create appointment");
        return;
      }
      responseStatus(res, "success", 201, "Appointment created successfully");
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async update(
    id: string,
    walletDoctor: string,
    appointment: IAppointment,
    res: Response
  ) {
    try {
      const userUpdating = await this.appointmentRepository.findById(id);

      if (userUpdating.wallet_user_doctor !== walletDoctor) {
        responseStatus(
          res,
          "error",
          400,
          "You are not allowed to update this appointment"
        );
        return;
      }

      const result = await this.appointmentRepository.update(id, appointment);
      if (result.affected === 0) {
        responseStatus(res, "error", 400, "Failed to update appointment");
        return;
      }
      responseStatus(res, "success", 200, "appointment updated successfully");
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findAppointmentsByWallet(
    wallet: string,
    page: number,
    limit: number,
    res: Response
  ) {
    try {
      const result = await this.appointmentRepository.findAppointmentsByWallet(
        wallet,
        page,
        limit
      );
      if (result.total === 0) {
        responseStatus(res, "error", 404, "Current appointment not found");
        return;
      }
      responseStatus(
        res,
        "success",
        200,
        "appointment fetched successfully",
        result
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteAccessLog(id: string, res: Response) {
    try {
      const result = await this.appointmentRepository.delete(id);
      if (result.affected === 0) {
        responseStatus(res, "error", 400, "Deleted before or not found");
        return;
      }
      responseStatus(res, "success", 200, "appointment deleted successfully");
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default new AppointmentService(new AppointmentRepository());
