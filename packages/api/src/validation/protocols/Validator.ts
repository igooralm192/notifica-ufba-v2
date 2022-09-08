import { BaseError } from '@/domain/helpers'

export interface IValidator {
  validate(field: string, value: any): BaseError | null
}
