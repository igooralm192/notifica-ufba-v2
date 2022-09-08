export type IQueryFilterDTO<T> = {
  [K in keyof T]?: T[K] extends string[] ? { has?: string } : never
}
