export interface IPaginatedList<T = any> {
  results: T[]
  total: number
}

export type IPageParams = {
  page: number
  limit: number
}
