import { IDisciplineGroup } from '@shared/entities'
import { BaseError } from '@/domain/helpers'
import { Either, UseCase } from '@shared/utils'
import { IQueryPaginateDTO } from '@/domain/dtos'

export namespace IReadDisciplineGroupsUseCase {
  export type Input = {
    listInput: {
      filter?: {
        studentIds?: { has?: string }
      }
      paginate?: IQueryPaginateDTO
    }
  }

  export type Output = {
    results: IDisciplineGroup[]
    total: number
  }
}

export type IReadDisciplineGroupsUseCase = UseCase<
  IReadDisciplineGroupsUseCase.Input,
  Either<BaseError, IReadDisciplineGroupsUseCase.Output>
>
