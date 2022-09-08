import { JoiValidation } from '@/infra/validation/joi'

import Joi from 'joi'

export const makeAuthenticateUserValidation = () => {
  return new JoiValidation(
    Joi.object({
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
    }),
  )
}
