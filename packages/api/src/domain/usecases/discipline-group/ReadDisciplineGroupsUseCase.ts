import { IDisciplineGroup } from '@shared/entities'
import { Either, UseCase } from '@shared/utils'
import { IQueryFilterDTO, IQueryPaginateDTO } from '@/domain/dtos'
import { BaseError } from '@/domain/helpers'

export namespace IReadDisciplineGroupsUseCase {
  export type Input = {
    where: IQueryFilterDTO<IDisciplineGroup>
    paginate?: IQueryPaginateDTO
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
