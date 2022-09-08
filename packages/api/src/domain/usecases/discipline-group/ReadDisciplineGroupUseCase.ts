import { IDisciplineGroup } from '@shared/entities'
import { BaseError } from '@/domain/helpers'
import { Either, UseCase } from '@shared/utils'

export namespace IReadDisciplineGroupUseCase {
  export type Input = {
    id: {
      disciplineGroupId?: string
    }
  }

  export type Output = {
    disciplineGroup: IDisciplineGroup
  }
}

export type IReadDisciplineGroupUseCase = UseCase<
  IReadDisciplineGroupUseCase.Input,
  Either<BaseError, IReadDisciplineGroupUseCase.Output>
>
