import Joi from "joi";

export const validateTodoSchema = Joi.object({
  title: Joi.string().min(2).max(15).trim().required(),
  description: Joi.string().min(5).max(30).trim(),
  date: Joi.date().required(),
});
