import { IDisciplineGroupMemberDTO } from '@shared/dtos'
import { IGetDisciplineGroupMembersEndpoint } from '@/api/discipline-group/types'

export namespace IUseGetAllDisciplineGroupMembers {
  export type Params = IGetDisciplineGroupMembersEndpoint.Params

  export type Output = {
    isLoading: boolean
    isRefreshing: boolean
    disciplineGroupMembers: IDisciplineGroupMemberDTO[]
    refresh: () => void
  }
}
