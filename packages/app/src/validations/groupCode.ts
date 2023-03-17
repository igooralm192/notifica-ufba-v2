import Joi from 'joi'

export const groupCodeSchema = Joi.string()
  .trim()
  .pattern(/^T[0-9]{6}$/)
  .messages({
    'any.required': `Campo obrigatório.`,
    'string.empty': 'Campo obrigatório.',
    'string.trim': 'Não pode haver espaços no início e no fim.',
    'string.pattern.base':
      "Código da turma precisa estar no formato: 'T######' (# -> dígito)",
  })
