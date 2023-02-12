import { IDisciplineGroup } from '@shared/entities'
import { Either } from '@shared/utils'
import { BaseError } from '@/domain/helpers'

export namespace IRemoveDisciplineGroupStudentUseCase {
  export type Context = {
    teacherId: string
  }

  export type Params = {
    disciplineGroupId: string
    studentId: string
  }

  export type Input = {
    context: Context
    params: Params
  }

  export type Output = {
    disciplineGroup: IDisciplineGroup
  }
}

export interface IRemoveDisciplineGroupStudentUseCase {
  removeStudent: (
    input: IRemoveDisciplineGroupStudentUseCase.Input,
  ) => Promise<Either<BaseError, IRemoveDisciplineGroupStudentUseCase.Output>>
}
