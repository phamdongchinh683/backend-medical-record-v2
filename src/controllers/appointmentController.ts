import { Request, Response } from "express";
import appointmentService from "../services/appointmentService";
import { IUserRequest } from "../types/IUserRequest";
import { asyncHandler } from "../utils/response";
class AppointmentController {
  addAppointment = asyncHandler(async (req: Request, res: Response) => {
    await appointmentService.create(req.body, res);
  });

  updateAppointment = asyncHandler(async (req: IUserRequest, res: Response) => {
    await appointmentService.update(
      req.params.id,
      req.user?.address,
      req.body,
      res
    );
  });

  getAppointments = asyncHandler(async (req: IUserRequest, res: Response) => {
    await appointmentService.findAppointmentsByWallet(
      req.user?.address,
      parseInt(req.query.limit as string) || 10,
      parseInt(req.query.page as string) || 1,
      res
    );
  });

  deleteAppointment = asyncHandler(async (req: Request, res: Response) => {
    await appointmentService.deleteAppointment(req.params.id, res);
  });
}

export default new AppointmentController();
