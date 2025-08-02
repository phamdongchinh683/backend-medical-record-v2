import Joi from "joi";

export const prescriptionSchema = Joi.object({
  nft_token: Joi.number().default(1).required(),
  drug_name: Joi.string().default("prescription name").required(),
  dosage: Joi.string().default("100mg").required(),
  frequency: Joi.string().default("100mg").required(),
  duration_days: Joi.string().default("100mg").required(),
  start_date: Joi.date().default(new Date()).required(),
  end_date: Joi.date().default(new Date()).required(),
  note: Joi.string().default("prescription description").required(),
});

export const prescriptionUpdateSchema = Joi.object({
  drug_name: Joi.string().default("prescription name").optional(),
  dosage: Joi.string().default("100mg").optional(),
  frequency: Joi.string().default("100mg").optional(),
  duration_days: Joi.string().default("100mg").optional(),
  start_date: Joi.date().default(new Date()).optional(),
  end_date: Joi.date().default(new Date()).optional(),
  note: Joi.string().default("prescription description").optional(),
});
