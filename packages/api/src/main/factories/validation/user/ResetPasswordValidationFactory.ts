import { JoiValidation } from '@/infra/validation/joi'

import Joi from 'joi'

export const makeResetPasswordValidation = () => {
  return new JoiValidation(
    Joi.object({
      newPassword: Joi.string().required().messages({
        'any.required': `Campo obrigatório.`,
        'string.empty': 'Campo obrigatório.',
      }),
      token: Joi.string().required().messages({
        'any.required': `Campo obrigatório.`,
        'string.empty': 'Campo obrigatório.',
      }),
    }),
  )
}
