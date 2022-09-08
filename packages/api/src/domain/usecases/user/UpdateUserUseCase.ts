import { IUser } from '@shared/entities'
import { BaseError } from '@/domain/helpers'
import { Either, UseCase } from '@shared/utils'

export namespace IUpdateUserUseCase {
  export type Input = {
    id: { userId?: string }
    data: {
      pushToken?: string
    }
  }

  export type Output = {
    user: IUser
  }
}

export type IUpdateUserUseCase = UseCase<
  IUpdateUserUseCase.Input,
  Either<BaseError, IUpdateUserUseCase.Output>
>
