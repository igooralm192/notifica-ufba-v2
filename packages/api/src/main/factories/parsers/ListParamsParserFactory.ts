import { ListParamsParser } from '@/application/parsers/ListParamsParser'
import { IListParamsParser } from '@/application/protocols'

export const makeListParamsParser = (): IListParamsParser => {
  return new ListParamsParser()
}
