import Joi from "joi";
import { VisitType } from "../utils/enum";

export const visitSchema = Joi.object({
  patient_id: Joi.string()
    .uuid()
    .default("1a0969ba-773d-4f7d-8294-51c43123ba81")
    .required(),

  doctor_id: Joi.string()
    .uuid()
    .default("0d4f50dc-b066-4560-aeb5-a8eafd44d802")
    .required(),

  visit_type: Joi.string()
    .valid(...Object.values(VisitType))
    .required(),

  nft_token: Joi.number().integer().positive().required(),

  department: Joi.string().max(60).default("Cardiology Department").required(),

  reason_for_visit: Joi.string().default("Seasick").required(),

  initial_diagnosis: Joi.string().default("Pneumonia").required(),

  visit_date: Joi.date().required(),
}).prefs({ convert: true });
