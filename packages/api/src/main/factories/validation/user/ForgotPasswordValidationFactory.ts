import { JoiValidation } from '@/infra/validation/joi'

import Joi from 'joi'

export const makeForgotPasswordValidation = () => {
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
    }),
  )
}
