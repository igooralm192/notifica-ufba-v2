import { IDisciplineGroupMessage } from '@shared/entities'
import { BaseError } from '@/domain/helpers'
import { Either, UseCase } from '@shared/utils'

export namespace IPostMessageUseCase {
  export type Input = {
    userId: string
    disciplineGroupId: string
    message: string
  }

  export type Output = IDisciplineGroupMessage
}

export type IPostMessageUseCase = UseCase<
  IPostMessageUseCase.Input,
  Either<BaseError, IPostMessageUseCase.Output>
>
