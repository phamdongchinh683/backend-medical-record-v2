import { Appointment } from "../entities";
import { BaseRepository } from "./baseRepository";

export class AppointmentRepository extends BaseRepository<Appointment> {
  constructor() {
    super(Appointment);
  }
}
