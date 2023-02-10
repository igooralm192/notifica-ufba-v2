import { IDisciplineGroupMemberDTO } from '@shared/dtos'
import { Either } from '@shared/utils'
import { BaseError } from '@/domain/helpers'

export namespace IReadDisciplineGroupMembersUseCase {
  export type Params = {
    disciplineGroupId: string
  }

  export type Output = IDisciplineGroupMemberDTO[]
}

export interface IReadDisciplineGroupMembersUseCase {
  readMembers: (
    params: IReadDisciplineGroupMembersUseCase.Params,
  ) => Promise<Either<BaseError, IReadDisciplineGroupMembersUseCase.Output>>
}
