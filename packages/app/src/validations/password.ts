import Joi from 'joi'

export const passwordSchema = Joi.string().min(6).max(64).messages({
  'any.required': `Campo obrigatório.`,
  'string.empty': 'Campo obrigatório.',
  'string.min': `Senha precisa ter no mínimo 6 caracteres.`,
  'string.max': `Senha precisa ter no máximo 64 caracteres.`,
})
