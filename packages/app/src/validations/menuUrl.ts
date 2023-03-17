import Joi from 'joi'

export const menuUrlSchema = Joi.string()
  .uri()
  .messages({
    'any.required': `Campo obrigatório.`,
    'string.empty': 'Campo obrigatório.',
    'string.uri': `URL inválida.`,
  })
