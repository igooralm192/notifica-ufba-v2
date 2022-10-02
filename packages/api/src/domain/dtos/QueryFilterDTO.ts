export type IQueryFilterDTO<T> = {
  [K in keyof T]?: T[K] extends string[]
    ? { has?: string }
    : T[K] extends string
    ? { contains?: string }
    : never
}
