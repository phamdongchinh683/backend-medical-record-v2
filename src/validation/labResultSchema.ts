import Joi from "joi";
import { TestType } from "../utils/enum";

export const labResultSchema = Joi.object({
  nft_token: Joi.number().default(1).required(),
  test_type: Joi.string()
    .valid(...Object.values(TestType))
    .required(),
  result: Joi.string().default("Normal").required(),
  test_date: Joi.date().default(new Date()).required(),
});

export const labResultUpdateSchema = Joi.object({
  test_type: Joi.string()
    .valid(...Object.values(TestType))
    .required(),
  result: Joi.string().default("Normal").required(),
  test_date: Joi.date().default(new Date()).required(),
});
