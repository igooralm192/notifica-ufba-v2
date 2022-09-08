import { ValidationError } from '@/application/errors';

export interface IValidation {
  validate(input?: Record<string, any>): ValidationError | null
}
