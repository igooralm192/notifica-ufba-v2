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
    const filter: IQueryFilterDTO<T> = {}

    Object.entries(input).forEach(([key, value]) => {
      if (key.endsWith('_has')) {
        const field = key.replace('_has', '')
        filter[field] = { has: value }
      } else if (key.endsWith('_contains')) {
        const field = key.replace('_contains', '')
        filter[field] = { contains: value }
      } else if (key != 'page' && key != 'limit') {
        filter[key] = { equals: value }
      }
    })

    return filter
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
}
