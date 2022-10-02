import { IDiscipline } from '@shared/entities'

export namespace IGetDisciplinesEndpoint {
  export interface Request {
    page?: number
    limit?: number
    code?: string
  }

  export interface Response {
    results: IDiscipline[]
    total: number
  }
}
