import Joi from "joi";
import { VisitType } from "../utils/enum";

export const visitUpdateSchema = Joi.object({
  visit_type: Joi.string()
    .valid(...Object.values(VisitType))
    .required(),
  nft_token: Joi.number().integer().positive().required(),
  department: Joi.string().max(60).required(),
  reason_for_visit: Joi.string().required(),
  initial_diagnosis: Joi.string().required(),
  visit_date: Joi.date().required(),
});
