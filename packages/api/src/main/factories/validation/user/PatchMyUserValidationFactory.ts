import { JoiValidation } from '@/infra/validation/joi'

import Joi from 'joi'

export const makePatchMyUserValidation = () => {
  return new JoiValidation(
    Joi.object({
      pushToken: Joi.string().optional(),
    }),
  )
}
