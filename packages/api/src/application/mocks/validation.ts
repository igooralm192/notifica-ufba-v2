import { BaseError } from '@/domain/helpers'

import { IValidation } from '@/validation/protocols'

export class MockedValidation implements IValidation {
  validate(): BaseError | null {
    throw new Error('Method not implemented.')
  }
}
