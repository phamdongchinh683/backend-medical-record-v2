import joi from "joi";

export const medicalNoteSchema = joi.object({
  nft_token: joi.number().default(1).required(),
  note: joi
    .string()
    .default("Necessary go to hospital detail your health")
    .required(),
  doctor_id: joi
    .string()
    .default("487958a6-d3a5-4919-8d53-4066be178910")
    .required(),
});

export const medicalNoteUpdateSchema = joi.object({
  note: joi.string().default("content note here").required(),
});
