import { BaseError } from '@/domain/helpers'
import { IValidation, IValidator } from '@/validation/protocols'

export class ValidationComposite<T extends string> implements IValidation {
  private constructor(
    private readonly validatorsMap: Record<T, IValidator[]>,
  ) {}

  static build<U extends string>(
    validatorsMap: Record<U, IValidator[]>,
  ): ValidationComposite<U> {
    return new ValidationComposite(validatorsMap)
  }

  validate(input: Record<T, any>): BaseError | null {
    for (const key in this.validatorsMap) {
      const validators = this.validatorsMap[key]

      for (const validator of validators) {
        const error = validator.validate(key, input[key])

        if (error) {
          return error
        }
      }
    }

    return null
  }
}
