import { IDiscipline } from '@shared/entities'
import { Either, UseCase } from '@shared/utils'
import { IQueryFilterDTO, IQueryPaginateDTO } from '@/domain/dtos'
import { BaseError } from '@/domain/helpers'

export namespace IReadDisciplinesUseCase {
  export type Input = {
    filter?: IQueryFilterDTO<IDiscipline>
    paginate?: IQueryPaginateDTO
  }

  export type Output = {
    results: IDiscipline[]
    total: number
  }
}

export type IReadDisciplinesUseCase =  UseCase<
  IReadDisciplinesUseCase.Input,
  Either<BaseError, IReadDisciplinesUseCase.Output>
>
