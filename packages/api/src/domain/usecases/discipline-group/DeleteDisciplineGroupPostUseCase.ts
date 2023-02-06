import { BaseError } from '@/domain/helpers'
import { Either } from '@shared/utils'

export namespace IDeleteDisciplineGroupPostUseCase {
  export type Params = {
    disciplineGroupId: string
    disciplineGroupPostId: string
  }

  export type Output = void
}

export interface IDeleteDisciplineGroupPostUseCase {
  delete: (
    params: IDeleteDisciplineGroupPostUseCase.Params,
  ) => Promise<Either<BaseError, IDeleteDisciplineGroupPostUseCase.Output>>
}
