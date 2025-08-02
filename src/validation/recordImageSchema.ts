import Joi from "joi";
import { ImageType } from "../utils/enum";

export const recordImageSchema = Joi.object({
  nft_token: Joi.number().default(1).required(),
  image_url: Joi.string().required(),
  type: Joi.string()
    .valid(...Object.values(ImageType))
    .required(),
  description: Joi.string().default("broken hand").required(),
});

export const recordImageUpdateSchema = Joi.object({
  image_url: Joi.string().optional(),
  type: Joi.string()
    .valid(...Object.values(ImageType))
    .optional(),
  description: Joi.string().default("broken hand").optional(),
});
