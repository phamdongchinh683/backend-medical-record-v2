import Joi from "joi";

export const infoUpdateSchema = Joi.object({
  full_name: Joi.string().min(5).max(30).optional(),
  date_of_birth: Joi.date().required(),
  gender: Joi.string().valid("male", "female").required(),
  citizen_identification: Joi.string().min(13).max(13).required(),
  phone_number: Joi.string().min(10).max(10).required(),
  zip_code: Joi.string().min(5).max(5).required(),
  city: Joi.string().min(3).max(30).required(),
  state: Joi.string().min(3).max(30).required(),
});
