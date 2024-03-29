import { IDisciplineGroup } from '@shared/entities'
import { Either } from '@shared/utils'
import { BaseError } from '@/domain/helpers'

export namespace IUnsubscribeStudentUseCase {
  export type Context = {
    studentId: string
  }

  export type Params = {
    disciplineGroupId: string
  }

  export type Input = {
    context: Context
    params: Params
  }

  export type Output = {
    disciplineGroup: IDisciplineGroup
  }
}

export interface IUnsubscribeStudentUseCase {
  unsubscribe: (
    input: IUnsubscribeStudentUseCase.Input,
  ) => Promise<Either<BaseError, IUnsubscribeStudentUseCase.Output>>
}
