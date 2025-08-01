import Joi from "joi";
import { AppointmentStatus } from "../utils/enum";

export const appointmentSchema = Joi.object({
  wallet_user_patient: Joi.string()
    .default("0x80475d8CA5C95F3CCF6dB1CB261b0CAdb04cDBe2")
    .length(42)
    .required(),
  wallet_user_doctor: Joi.string()
    .default("0xF151Dde9781aa2aAF9D7935dCa65af7d2117DD8D")
    .length(42)
    .required(),
  date_time: Joi.date().required(),
  status: Joi.string()
    .valid(...Object.values(AppointmentStatus))
    .optional(),
});

export const appointmentUpdateSchema = Joi.object({
  date_time: Joi.date().optional(),
  status: Joi.string()
    .valid(...Object.values(AppointmentStatus))
    .optional(),
});
