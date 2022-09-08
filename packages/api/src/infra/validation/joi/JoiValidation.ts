import { ValidationError } from '@/application/errors'
import { IValidation } from '@/validation/protocols'

import Joi from 'joi'

export class JoiValidation implements IValidation {
  constructor(readonly schema: Joi.Schema) {}

  validate(input: Record<string, any>): ValidationError | null {
    const { error } = this.schema.validate(input)

    if (!error) return null

    const errorMessage = error.details[0].message
    const fieldKey = error.details[0].context?.key
    const fieldValue = error.details[0].context?.value

    return new ValidationError(
      errorMessage,
      fieldKey
        ? {
            key: fieldKey,
            value: fieldValue,
          }
        : undefined,
    )
  }
}
