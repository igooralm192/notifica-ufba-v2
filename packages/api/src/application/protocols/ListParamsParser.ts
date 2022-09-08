import {
  IQueryFilterDTO,
  IQueryPaginateDTO
} from '@/domain/dtos'

export namespace IListParamsParser {
  export type Input = Record<string, string>
  export type Output<T = any> = {
    filter?: IQueryFilterDTO<T>
    paginate?: IQueryPaginateDTO
  }
}

export interface IListParamsParser<O = any> {
  parse(input: IListParamsParser.Input): IListParamsParser.Output<O>
}
