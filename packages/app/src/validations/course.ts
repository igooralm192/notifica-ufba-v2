import Joi from 'joi'

export const courseSchema = Joi.string().messages({
  'any.required': `Campo obrigatório.`,
  'string.empty': 'Campo obrigatório.',
})
