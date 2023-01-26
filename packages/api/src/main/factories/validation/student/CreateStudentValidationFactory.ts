import { JoiValidation } from '@/infra/validation/joi'

import Joi from 'joi'

export const makeCreateStudentValidation = () => {
  return new JoiValidation(
    Joi.object({
      name: Joi.string().required().messages({
        'any.required': `Campo obrigatório.`,
        'string.empty': 'Campo obrigatório.',
      }),
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
          'any.required': `Campo obrigatório.`,
          'string.empty': 'Campo obrigatório.',
          'string.email': `E-mail inválido.`,
        }),
      password: Joi.string().min(6).required().messages({
        'any.required': `Campo obrigatório.`,
        'string.empty': 'Campo obrigatório.',
        'string.min': `Senha precisa ter no mínimo 6 caracteres.`,
      }),
      matriculation: Joi.string().required().messages({
        'any.required': `Campo obrigatório.`,
        'string.empty': 'Campo obrigatório.',
      }),
      course: Joi.string().required().messages({
        'any.required': `Campo obrigatório.`,
        'string.empty': 'Campo obrigatório.',
      }),
    }),
  )
}
