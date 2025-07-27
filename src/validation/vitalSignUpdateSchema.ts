import Joi from "joi";

export const vitalSignUpdateSchema = Joi.object({
  temperature: Joi.number().default(36.5).required(),
  heart_rate: Joi.number().default(70).required(),
  respiratory_rate: Joi.number().default(12).required(),
  weight: Joi.number().default(70).required(),
  height: Joi.number().default(170).required(),
});
