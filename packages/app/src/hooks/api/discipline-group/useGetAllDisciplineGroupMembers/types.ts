import { IFilterParams } from '@/types/list'
import { IDisciplineGroupMemberDTO } from '@shared/dtos'

export namespace IUseGetAllDisciplineGroupMembers {
  export type Params = {
    disciplineGroupId: string
  }

  export type Query = Partial<IFilterParams>

  export type Output = {
    isLoading: boolean
    isFetchingMore: boolean
    isRefreshing: boolean
    hasNextPage: boolean
    disciplineGroupMembers: IDisciplineGroupMemberDTO[]
    fetchNextPage: () => void
    refresh: () => void
  }
}
