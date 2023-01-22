import { IDisciplineGroup } from '@shared/entities'
import { Either } from '@shared/utils'
import { BaseError } from '@/domain/helpers'

export namespace ICreateDisciplineGroupUseCase {
  export type Params = {
    userId: string
    disciplineId: string
  }

  export type Body = {
    code: string
    semester: string
    description: string
    menuUrl: string
    place: string
  }

  export type Output = IDisciplineGroup
}

export interface ICreateDisciplineGroupUseCase {
  create(
    params: ICreateDisciplineGroupUseCase.Params,
    body: ICreateDisciplineGroupUseCase.Body,
  ): Promise<Either<BaseError, ICreateDisciplineGroupUseCase.Output>>
}
