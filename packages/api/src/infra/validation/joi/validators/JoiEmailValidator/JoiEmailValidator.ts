import { BaseError } from '@/domain/helpers'
import { IValidator } from '@/validation/protocols'

import Joi from 'joi'

export class JoiEmailValidator implements IValidator {
  validate(field: string, value: any): BaseError | null {
    const error = Joi.string().email().validate(value).error

    if (error)
      return new BaseError('ValidatorError', error.message, {
        key: field,
        value,
      })

    return null
  }
}
