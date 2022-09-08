import { JoiValidation } from '@/infra/validation/joi'

import Joi from 'joi'

export const makePostMessageValidation = () => {
  return new JoiValidation(
    Joi.object({
      message: Joi.string().required().messages({
        'any.required': `Campo obrigatório.`,
        'string.empty': 'Campo obrigatório.',
      }),
    }),
  )
}
