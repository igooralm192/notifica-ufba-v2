import Joi from 'joi'

export const matriculationSchema = Joi.string().length(9).messages({
  'any.required': `Campo obrigatório.`,
  'string.empty': 'Campo obrigatório.',
  'string.length': 'Matrícula precisa ter 9 dígitos.',
})
