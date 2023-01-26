import { JoiValidation } from '@/infra/validation/joi'

import Joi from 'joi'

export const makeCreateDisciplineGroupPostValidation = () => {
  return new JoiValidation(
    Joi.object({
      title: Joi.string().optional(),
      content: Joi.string().required().messages({
        'any.required': `Campo obrigatório.`,
        'string.empty': 'Campo obrigatório.',
      }),
    }),
  )
}
