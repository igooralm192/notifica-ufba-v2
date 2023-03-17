export type IQueryFilterDTO<T> = {
  [K in keyof T]?: T[K] extends (infer A)[]
    ? A extends Record<string, any>
      ? IQueryFilterDTO<A>
      : { in?: T[K] }
    : T[K] extends Date
    ? { equals?: string | Date }
    : T[K] extends Record<string, any>
    ? IQueryFilterDTO<T[K]>
    : { equals?: string, contains?: string }
} & {
  OR?: IQueryFilterDTO<T>[]
}
