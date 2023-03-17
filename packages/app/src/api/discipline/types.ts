import { IDiscipline } from '@shared/entities'

export namespace IGetDisciplinesEndpoint {
  export interface Request {
    page?: number
    limit?: number
    code?: string
    teacherId?: string
  }

  export interface Response {
    results: IDiscipline[]
    total: number
  }
}

export namespace ICreateGroupEndpoint {
  export type Params = {
    disciplineId: string
  }

  export type Body = {
    code: string
    semester: string
    description: string
    menuUrl: string
    place: string
  }
}
