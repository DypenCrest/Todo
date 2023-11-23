import Joi from "joi";

export const validateTodoSchema = Joi.object({
  title: Joi.string().min(2).max(15).trim(),
  description: Joi.string().min(5).max(125).trim(),
  date: Joi.date(),
  isCompleted: Joi.boolean().required(),
});
