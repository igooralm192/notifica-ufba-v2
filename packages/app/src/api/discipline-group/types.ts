import { ILastMessageDTO } from '@shared/dtos'
import {
  IDisciplineGroup,
  IDisciplineGroupMessage,
  IDisciplineGroupPost,
} from '@shared/entities'

export namespace IGetDisciplineGroupsEndpoint {
  export interface Request {
    query?: {
      studentId?: string
    }
    page?: number
    limit?: number
  }

  export interface Response {
    results: IDisciplineGroup[]
    total: number
  }
}

export namespace IGetDisciplineGroupEndpoint {
  export interface Request {
    disciplineGroupId: string
  }

  export interface Response {
    disciplineGroup: IDisciplineGroup
  }
}

export namespace IGetDisciplineGroupPostsEndpoint {
  export interface Request {
    page?: number
    limit?: number
  }

  export interface Response {
    results: IDisciplineGroupPost[]
    total: number
  }
}

export namespace IGetDisciplineGroupMessagesEndpoint {
  export interface Params {
    disciplineGroupId: string
  }

  export interface Query {
    limit?: number
    nextCursor?: string
  }

  export interface Response {
    results: IDisciplineGroupMessage[]
    nextCursor?: string
  }
}

export namespace IDisciplineGroupMessageListener {
  export interface Params {
    disciplineGroupId: string
  }

  export type Callback = (
    disciplineGroupMessages: IDisciplineGroupMessage[],
  ) => void
}

export namespace IGetMyLastMessagesEndpoint {
  export interface Request {
    page: number
    limit: number
  }

  export interface Response {
    results: ILastMessageDTO[]
    total: number
  }
}

export namespace ISubscribeStudentEndpoint {
  export interface Request {
    disciplineGroupId: string
  }
}

export namespace ICreatePostEndpoint {
  export type Params = {
    disciplineGroupId: string
  }

  export type Body = {
    content: string
  }
}
