import { JoiValidation } from '@/infra/validation/joi'

import Joi from 'joi'

export const makeCreateDisciplineGroupValidation = () => {
  return new JoiValidation(
    Joi.object({
      code: Joi.string().required().messages({
        'any.required': `Campo obrigatório.`,
        'string.empty': 'Campo obrigatório.',
      }),
      semester: Joi.string().required().messages({
        'any.required': `Campo obrigatório.`,
        'string.empty': 'Campo obrigatório.',
      }),
      description: Joi.string().required().messages({
        'any.required': `Campo obrigatório.`,
        'string.empty': 'Campo obrigatório.',
      }),
      menuUrl: Joi.string().uri().required().messages({
        'any.required': `Campo obrigatório.`,
        'string.empty': 'Campo obrigatório.',
      }),
      place: Joi.string().required().messages({
        'any.required': `Campo obrigatório.`,
        'string.empty': 'Campo obrigatório.',
      }),
    }),
  )
}
