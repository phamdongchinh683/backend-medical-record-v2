import { AppointmentRepository } from "../repositories/AppointmentRepository";

class AppointmentService {
  constructor(private readonly appointmentRepository: AppointmentRepository) {}
}

export default new AppointmentService(new AppointmentRepository());
