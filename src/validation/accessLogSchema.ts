import Joi from "joi";
import { ActionType } from "../utils/enum";

export const accessLogSchema = Joi.object({
  user_id: Joi.string().uuid().required(),
  nft_token: Joi.number().integer().positive().required(),
  action: Joi.string()
    .valid(...Object.values(ActionType))
    .required(),
});
