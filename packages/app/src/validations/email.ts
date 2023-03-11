import Joi from 'joi'

export const emailSchema = Joi.string()
  .email({ tlds: { allow: false } })
  .messages({
    'any.required': `Campo obrigatório.`,
    'string.empty': 'Campo obrigatório.',
    'string.email': `E-mail inválido.`,
  })
