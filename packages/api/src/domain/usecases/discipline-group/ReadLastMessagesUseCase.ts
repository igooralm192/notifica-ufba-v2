
import { IQueryPaginateDTO } from '@/domain/dtos'
import { BaseError } from '@/domain/helpers'
import { Either, UseCase } from '@shared/utils'

export interface ILastMessageDTO {
  disciplineGroupId: string
  disciplineGroupCode: string
  disciplineName: string
  disciplineCode: string
  message: string
  sentBy: string
  sentAt: Date
}

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
