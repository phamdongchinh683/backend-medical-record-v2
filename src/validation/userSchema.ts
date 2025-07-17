import Joi from "joi";

export const userSchema = Joi.object({
  wallet_user: Joi.string()
    .length(42)
    .default("0xF151Dde9781aa2aAF9D7935dCa65afE")
    .description("Wallet user address (42 characters)")
    .required(),

  full_name: Joi.string()
    .min(5)
    .max(30)
    .default("John Doe")
    .description("User's full name (5-30 characters)")
    .required(),

  date_of_birth: Joi.date()
    .description("User's date of birth (YYYY-MM-DD)")
    .required(),

  gender: Joi.string()
    .valid("male", "female")
    .description("User's gender: 'male' or 'female'")
    .required(),

  citizen_identification: Joi.string()
    .min(13)
    .max(13)
    .description("Citizen identification number (13 characters)")
    .default("1234567890123")
    .required(),

  phone_number: Joi.string()
    .min(12)
    .max(12)
    .default("081234567890")
    .description("Phone number (12 digits, e.g., country code + number)")
    .required(),

  type: Joi.string()
    .valid("doctor", "patient")
    .description("User type: 'doctor' or 'patient'")
    .required(),

  zip_code: Joi.string()
    .max(10)
    .min(5)
    .default("12345")
    .description("Zip or postal code (up to 10 characters)")
    .required(),

  city: Joi.string()
    .max(30)
    .default("Da nang")
    .description("City name (up to 30 characters)")
    .required(),

  state: Joi.string()
    .max(30)
    .default("Vietnam")
    .description("State or province name (up to 30 characters)")
    .required(),
});
