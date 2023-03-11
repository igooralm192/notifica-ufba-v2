import Joi from 'joi'

export const nameSchema = Joi.string()
  .trim()
  .min(2)
  .max(64)
  .pattern(/^[a-zA-Z\sÀ-ÿ]+$/)
  .messages({
    'any.required': 'Campo obrigatório.',
    'string.empty': 'Campo obrigatório.',
    'string.min': 'Precisa ter no mínimo {{#limit}} caracteres.',
    'string.max': 'Precisa ter no máximo {{#limit}} caracteres.',
    'string.trim': 'Não pode haver espaços no início e no fim.',
    'string.pattern.base':
      'Não pode have números e certos caracteres especiais.',
  })
