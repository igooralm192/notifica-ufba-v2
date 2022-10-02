export interface IPaginatedList<T = any> {
  results: T[]
  total: number
}

export type IFilterParams = {
  page: number
  limit: number
  search?: string
}
