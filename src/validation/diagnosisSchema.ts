import joi from "joi";
import { DiagnosisType } from "../utils/enum";

export const diagnosisSchema = joi.object({
  nft_token: joi.number().required(),
  diagnosis_name: joi.string().default("Fever").required(),
  wallet_patient: joi
    .string()
    .length(42)
    .default("0xF151Dde9781aa2aAF9D7935dCa65af7d2117DD1")
    .required(),
  type: joi
    .string()
    .valid(...Object.values(DiagnosisType))
    .required(),
});

export const updateDiagnosisSchema = joi.object({
  diagnosis_name: joi.string().default("Fever").required(),
  type: joi
    .string()
    .valid(...Object.values(DiagnosisType))
    .required(),
});
