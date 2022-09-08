import { IUser } from '@shared/entities'
import { BaseError } from '@/domain/helpers'
import { Either, UseCase } from '@shared/utils'

export namespace IGetUserByIdUseCase {
  export type Input = {
    userId: string
  }

  export type Output = {
    user: IUser
  }
}

export type IGetUserByIdUseCase = UseCase<
  IGetUserByIdUseCase.Input,
  Either<BaseError, IGetUserByIdUseCase.Output>
>
