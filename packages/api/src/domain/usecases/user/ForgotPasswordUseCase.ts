import { Either } from '@shared/utils'
import { BaseError } from '@/domain/helpers'

export namespace IForgotPasswordUseCase {
  export type Input = {
    email: string
  }
}

export interface IForgotPasswordUseCase {
  forgotPassword: (input: IForgotPasswordUseCase.Input) => Promise<Either<BaseError, void>>
}
