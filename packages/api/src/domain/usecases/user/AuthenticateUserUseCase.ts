import { IUser } from '@shared/entities'
import { BaseError } from '@/domain/helpers'
import { Either, UseCase } from '@shared/utils'

export namespace IAuthenticateUserUseCase {
  export type Input = {
    email: string
    password: string
  }

  export type Output = {
    token: string
    user: IUser
  }
}

export type IAuthenticateUserUseCase = UseCase<
  IAuthenticateUserUseCase.Input,
  Either<BaseError, IAuthenticateUserUseCase.Output>
>
