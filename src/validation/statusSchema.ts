import Joi from "joi";

export const statusSchema = Joi.object({
  active: Joi.string().valid("active", "inactive").required(),
});
