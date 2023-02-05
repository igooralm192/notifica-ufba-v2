import { BaseError } from '@/domain/helpers'
import { Either } from '@shared/utils'

export namespace IDeleteDisciplineGroupUseCase {
  export type Params = {
    disciplineGroupId: string
  }
}

export interface IDeleteDisciplineGroupUseCase {
  delete: (
    params: IDeleteDisciplineGroupUseCase.Params,
  ) => Promise<Either<BaseError, void>>
}
