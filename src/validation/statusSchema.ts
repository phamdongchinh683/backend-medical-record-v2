import Joi from "joi";

export const statusSchema = Joi.object({
  active: Joi.string()
    .valid("active", "inactive")
    .description("Status of the user")
    .required(),
});
