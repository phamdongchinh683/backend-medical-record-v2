import { Appointment } from "../entities";
import { BaseRepository } from "./baseRepository";

export class AppointmentRepository extends BaseRepository<Appointment> {
  constructor() {
    super(Appointment);
  }

  async findExistingAppointment(
    dateTime: Date,
    walletUserDoctor: string,
    walletUserPatient: string
  ): Promise<Appointment | null> {
    return await this.repo.findOne({
      where: {
        date_time: dateTime,
        wallet_user_doctor: walletUserDoctor,
        wallet_user_patient: walletUserPatient,
      },
    });
  }

  async findAppointmentsByDoctor(
    walletUserDoctor: string,
    dateTime?: Date
  ): Promise<Appointment[]> {
    const whereCondition: any = {
      wallet_user_doctor: walletUserDoctor,
    };

    if (dateTime) {
      whereCondition.date_time = dateTime;
    }

    return await this.repo.find({
      where: whereCondition,
      order: {
        date_time: "ASC",
      },
    });
  }

  async findAppointmentsByPatient(
    walletUserPatient: string,
    dateTime?: Date
  ): Promise<Appointment[]> {
    const whereCondition: any = {
      wallet_user_patient: walletUserPatient,
    };

    if (dateTime) {
      whereCondition.date_time = dateTime;
    }

    return await this.repo.find({
      where: whereCondition,
      order: {
        date_time: "ASC",
      },
    });
  }

  async createWithValidation(appointmentData: any): Promise<Appointment> {
    // Check for existing appointment with same date, doctor, and patient
    const existingAppointment = await this.findExistingAppointment(
      appointmentData.date_time,
      appointmentData.wallet_user_doctor,
      appointmentData.wallet_user_patient
    );

    if (existingAppointment) {
      throw new Error(
        "An appointment already exists for this date, doctor, and patient combination"
      );
    }

    return await this.create(appointmentData);
  }
}
