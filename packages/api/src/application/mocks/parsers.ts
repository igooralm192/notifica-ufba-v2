import { IListParamsParser } from '@/application/protocols'

export class MockedListParamsParser implements IListParamsParser {
  parse(): IListParamsParser.Output {
    throw new Error('Method not implemented.')
  }
}
