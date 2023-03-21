import { JoiValidation } from '@/infra/validation/joi'

import Joi from 'joi'

export const makeSendFeedbackValidation = () => {
  return new JoiValidation(
    Joi.object({
      feedback: Joi.string().trim().required().messages({
        'any.required': `Campo obrigatório.`,
        'string.empty': 'Campo obrigatório.',
      }),
    }),
  )
}
