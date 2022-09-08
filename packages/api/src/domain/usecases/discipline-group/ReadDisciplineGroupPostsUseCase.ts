import { IDisciplineGroupPost } from '@shared/entities'
import { BaseError } from '@/domain/helpers'
import { Either, UseCase } from '@shared/utils'
import { IQueryPaginateDTO } from '@/domain/dtos'

export namespace IReadDisciplineGroupPostsUseCase {
  export type Input = {
    disciplineGroupId: string
    listInput: {
      paginate?: IQueryPaginateDTO
    }
  }

  export type Output = {
    results: IDisciplineGroupPost[]
    total: number
  }
}

export type IReadDisciplineGroupPostsUseCase = UseCase<
  IReadDisciplineGroupPostsUseCase.Input,
  Either<BaseError, IReadDisciplineGroupPostsUseCase.Output>
>
