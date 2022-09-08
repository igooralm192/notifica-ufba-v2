import { IDisciplineGroup } from '@shared/entities'
import { BaseError } from '@/domain/helpers'
import { Either, UseCase } from '@shared/utils'

export namespace ISubscribeStudentToDisciplineGroupUseCase {
  export type Input = {
    userId: string
    disciplineGroupId: string
  }

  export type Output = {
    disciplineGroup: IDisciplineGroup
  }
}

export type ISubscribeStudentToDisciplineGroupUseCase = UseCase<
  ISubscribeStudentToDisciplineGroupUseCase.Input,
  Either<BaseError, ISubscribeStudentToDisciplineGroupUseCase.Output>
>
