import { IFilterParams } from '@/types/list'
import { IDisciplineGroup } from '@shared/entities'

export namespace IUseGetAllDisciplineGroups {
  export type Query = Partial<IFilterParams> & {
    studentId?: string
    teacherId?: string
  }

  export type Output = {
    isLoading: boolean
    isFetchingMore: boolean
    isRefreshing: boolean
    hasNextPage: boolean
    disciplineGroups: IDisciplineGroup[]
    fetchNextPage: () => void
    refresh: () => void
  }
}
