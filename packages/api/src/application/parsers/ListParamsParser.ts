import { IQueryFilterDTO, IQueryPaginateDTO } from '@/domain/dtos'
import { IListParamsParser } from '@/application/protocols'

export class ListParamsParser<T> implements IListParamsParser<T> {
  parse(input: IListParamsParser.Input): IListParamsParser.Output<T> {
    const filterArgs = this.parseFilter(input)
    const paginateArgs = this.parsePaginate(input)

    return {
      filter: filterArgs,
      paginate: paginateArgs,
    }
  }

  private parseFilter(input: IListParamsParser.Input): IQueryFilterDTO<T> {
    return this.parseQueryRecursive<T>(input, {})
  }

  private parsePaginate(input: IListParamsParser.Input): IQueryPaginateDTO {
    const paginate: IQueryPaginateDTO = {}

    Object.entries(input).forEach(([key, value]) => {
      switch (key) {
        case 'page':
          paginate.page = Number(value)
          break

        case 'limit':
          paginate.limit = Number(value)
          break
      }
    })

    return paginate
  }

  private parseQueryRecursive<T>(
    query: any,
    result: IQueryFilterDTO<T>,
  ): IQueryFilterDTO<T> {
    for (const key in query) {
      if (key.toUpperCase() === 'OR') {
        result.OR = query[key].map(item => {
          return this.parseQueryRecursive(item, {}) as IQueryFilterDTO<
            T[keyof T]
          >
        })
      } else if (Array.isArray(query[key])) {
        const items = query[key].map(item => {
          if (typeof item === 'object') {
            return this.parseQueryRecursive(item, {}) as IQueryFilterDTO<
              T[keyof T]
            >
          }
          return item
        })
        result[key] = { in: items }
      } else if (typeof query[key] === 'object') {
        result[key] = this.parseQueryRecursive(
          query[key],
          {},
        ) as IQueryFilterDTO<T[keyof T]>
      } else if (query[key].includes('%')) {
        const likeValue = query[key].match(/%([a-zA-Z\sÀ-ÿ]+)%/)
        result[key] = { contains: likeValue[1] }
      } else {
        result[key] = { equals: query[key] }
      }
    }

    return result
  }
}
