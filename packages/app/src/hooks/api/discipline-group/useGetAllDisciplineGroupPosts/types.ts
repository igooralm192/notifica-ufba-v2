import { IFilterParams } from '@/types/list'
import { IDisciplineGroupPost } from '@shared/entities'

export namespace IUseGetAllDisciplineGroupPosts {
  export type Params = {
    disciplineGroupId: string
  }

  export type Query = Partial<IFilterParams>

  export type Output = {
    isLoading: boolean
    isFetchingMore: boolean
    isRefreshing: boolean
    hasNextPage: boolean
    disciplineGroupPosts: IDisciplineGroupPost[]
    fetchNextPage: () => void
    refresh: () => void
  }
}
