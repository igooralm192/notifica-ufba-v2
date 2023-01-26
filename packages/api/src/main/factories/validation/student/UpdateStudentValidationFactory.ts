import { JoiValidation } from '@/infra/validation/joi'

import Joi from 'joi'

export const makeUpdateStudentValidation = () => {
  return new JoiValidation(
    Joi.object({
      matriculation: Joi.string().optional(),
      course: Joi.string().optional(),
      user: Joi.object({
        name: Joi.string().optional(),
        pushToken: Joi.string().optional(),
      }).optional(),
    }),
  )
}
