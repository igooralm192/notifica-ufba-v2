import { BaseError } from '@/domain/helpers'
import { Either, UseCase } from '@shared/utils'

export namespace IGetUserIdByTokenUseCase {
  export type Input = {
    token: string
  }

  export type Output = {
    userId: string
  }
}

export type IGetUserIdByTokenUseCase = UseCase<
  IGetUserIdByTokenUseCase.Input,
  Either<BaseError, IGetUserIdByTokenUseCase.Output>
>
