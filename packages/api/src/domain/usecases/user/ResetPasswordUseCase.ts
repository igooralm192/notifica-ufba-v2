import { Either } from '@shared/utils'
import { BaseError } from '@/domain/helpers'

export namespace IResetPasswordUseCase {
  export type Body = {
    newPassword: string
    token: string
  }
}

export interface IResetPasswordUseCase {
  resetPassword: (
    body: IResetPasswordUseCase.Body,
  ) => Promise<Either<BaseError, void>>
}
