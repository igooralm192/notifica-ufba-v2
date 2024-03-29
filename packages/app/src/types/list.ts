export interface IPaginatedList<T = any> {
  results: T[]
  total: number
}

export type IFilterParams = {
  page: number
  limit: number
  search?: string
}

export interface IUsePaginatedList<T> {
  isFetchingMore: boolean
  isRefreshing: boolean
  data: T[]
  onNextPage: () => void
  onRefresh: () => void
}
