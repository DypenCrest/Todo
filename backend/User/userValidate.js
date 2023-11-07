import Joi from "joi";

export const validateRegisterSchema = Joi.object({
  username: Joi.string().min(2).max(25).trim().required(),
  email: Joi.string()
    .email()
    .trim()
    .required()
    .lowercase()
    .pattern(/^\S+@\S+\.\S+$/),
  password: Joi.string()
    .min(8)
    .max(16)
    .trim()
    .required()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    ),
});

export const validateLoginSchema = Joi.object({
  username: Joi.string().trim().required(),
  password: Joi.string().trim().required(),
});
