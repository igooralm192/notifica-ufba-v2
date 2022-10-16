import { IDiscipline } from '@shared/entities'
import { IFilterParams } from '@/types/list'

export namespace IUseGetAllDisciplines {
  export type Query = Partial<IFilterParams> & {
    code?: string
  }

  export type Output = {
    isLoading: boolean
    isFetchingMore: boolean
    isRefreshing: boolean
    hasNextPage: boolean
    disciplines: IDiscipline[]
    fetchNextPage: () => void
    refresh: () => void
  }
}
