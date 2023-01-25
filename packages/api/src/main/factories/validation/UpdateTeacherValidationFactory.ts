import { JoiValidation } from '@/infra/validation/joi'

import Joi from 'joi'

export const makeUpdateTeacherValidation = () => {
  return new JoiValidation(
    Joi.object({
      user: Joi.object({
        name: Joi.string().optional(),
        pushToken: Joi.string().optional(),
      }).optional(),
    }),
  )
}
