import { BaseError } from '@/domain/helpers'
import { IDisciplineGroup } from '@shared/entities'
import { Either } from '@shared/utils'

export namespace IUnsubscribeStudentUseCase {
  export type Params = {
    userId: string
    disciplineGroupId: string
  }

  export type Output = {
    disciplineGroup: IDisciplineGroup
  }
}

export interface IUnsubscribeStudentUseCase {
  unsubscribe: (
    params: IUnsubscribeStudentUseCase.Params,
  ) => Promise<Either<BaseError, IUnsubscribeStudentUseCase.Output>>
}
