import { ILastMessageDTO } from '@shared/dtos'
import { Either, UseCase } from '@shared/utils'

import { IQueryPaginateDTO } from '@/domain/dtos'
import { BaseError } from '@/domain/helpers'

export namespace IReadLastMessagesUseCase {
  export type Input = {
    userId: string
    listInput: {
      paginate?: IQueryPaginateDTO
    }
  }

  export type Output = {
    results: ILastMessageDTO[]
    total: number
  }
}

export type IReadLastMessagesUseCase = UseCase<
  IReadLastMessagesUseCase.Input,
  Either<BaseError, IReadLastMessagesUseCase.Output>
>
