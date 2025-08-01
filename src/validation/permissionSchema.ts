import Joi from "joi";
import { PermissionStatus } from "../utils/enum";

export const permissionSchema = Joi.object({
  wallet_user_patient: Joi.string()
    .default("0x80475d8CA5C95F3CCF6dB1CB261b0CAdb04cDBe8")
    .optional(),
  wallet_user_doctor: Joi.string()
    .default("0x80475d8CA5C95F3CCF6dB1CB261b0CAdb04cDBe8")
    .optional(),
  status: Joi.string()
    .valid(...Object.values(PermissionStatus))
    .required(),
});

export const updatePermissionSchema = Joi.object({
  status: Joi.string()
    .valid(...Object.values(PermissionStatus))
    .required(),
});
