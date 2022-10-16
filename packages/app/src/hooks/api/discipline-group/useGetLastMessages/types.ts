import { ILastMessageDTO } from '@shared/dtos'
import { IFilterParams } from '@/types/list'

export namespace IUseGetLastMessages {
  export type Query = Partial<IFilterParams>

  export type Output = {
    isLoading: boolean
    isFetchingMore: boolean
    isRefreshing: boolean
    hasNextPage: boolean
    lastMessages: ILastMessageDTO[]
    fetchNextPage: () => void
    refresh: () => void
  }
}
