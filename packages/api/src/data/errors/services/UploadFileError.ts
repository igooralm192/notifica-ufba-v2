import { BaseError } from '@/domain/helpers'

export class UploadFileError extends BaseError {
  constructor(error: Error) {
    super(
      'UploadFileError',
      'Erro ao realizar upload de arquivo.',
      undefined,
      error.stack
    )
  }
}
