import { JoiValidation } from '@/infra/validation/joi'

import Joi from 'joi'

export const makeUpdateUserPictureValidation = () => {
  return new JoiValidation(
    Joi.object({
      originalName: Joi.string(),
      buffer: Joi.binary(),
      type: Joi.string(),
    }),
  )
}
