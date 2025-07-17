import Joi from "joi";

export const messageVerifySchema = Joi.object({
  address: Joi.string()
    .length(42)
    .default("0xF151Dde9781aa2aAF9D7935dCa65afE")
    .description("Wallet user address (43 characters, default provided)")
    .required(),
  message: Joi.string()
    .length(100)
    .default(
      "Sign in to MedicalNFT at 2025-07-16T04:35:16.701Z for 0x80475d8CA5C95F3CCF6dB1CB261b0CAdb04cDBe8"
    )
    .description("Message to verify")
    .required(),
  signature: Joi.string()
    .length(132)
    .default("0x1234567890123456789012345678901234567890")
    .description("Signature to verify")
    .required(),
});
