import { Either } from '@shared/utils'
import { BaseError } from '@/domain/helpers'

export namespace IForgotPasswordUseCase {
  export type Query = {
    expo?: boolean
  }
  export type Body = {
    email: string
  }
  export type Input = {
    query: Query
    body: Body
  }
}

export interface IForgotPasswordUseCase {
  forgotPassword: (
    input: IForgotPasswordUseCase.Input,
  ) => Promise<Either<BaseError, void>>
}
