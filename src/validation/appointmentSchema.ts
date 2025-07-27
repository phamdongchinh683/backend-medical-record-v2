import Joi from "joi";
import { AppointmentStatus } from "../utils/enum";

export const appointmentSchema = Joi.object({
  wallet_user_patient: Joi.string().length(60).required(),
  wallet_user_doctor: Joi.string().length(60).required(),
  date_time: Joi.date().greater("now").required(),
  status: Joi.string()
    .valid(...Object.values(AppointmentStatus))
    .optional(),
});

export const appointmentUpdateSchema = Joi.object({
  date_time: Joi.date().greater("now").optional(),
  status: Joi.string()
    .valid(...Object.values(AppointmentStatus))
    .optional(),
});
