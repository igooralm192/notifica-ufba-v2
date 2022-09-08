import { BaseError } from '@/domain/helpers'

export class MissingParamsError extends BaseError {
  constructor() {
    super('MissingParamsError', 'Faltam parâmetros.')
  }
}
