import { IDisciplineGroupPost } from '@shared/entities'

export type IDisciplineGroupPostRepositoryListInput = {
  where?: { disciplineGroupId?: string }
  take?: number
  skip?: number
  include?: {
    author?: boolean
    disciplineGroup?: boolean
  }
  orderBy?: {
    [key in keyof IDisciplineGroupPost]?: IDisciplineGroupPost[key] extends
      | string
      | number
      | Date
      ? 'asc' | 'desc'
      : never
  }
}

export namespace IDisciplineGroupPostRepository {
  export namespace Create {
    export type Input = {
      title?: string
      content: string
      authorId: string
      disciplineGroupId: string
    }
    export type Output = IDisciplineGroupPost
  }

  export interface Create {
    create(input: Create.Input): Promise<Create.Output>
  }

  export namespace Count {
    export type Input = IDisciplineGroupPostRepositoryListInput
    export type Output = number
  }

  export interface Count {
    count(input?: Count.Input): Promise<Count.Output>
  }

  export namespace FindAll {
    export type Input = IDisciplineGroupPostRepositoryListInput
    export type Output = IDisciplineGroupPost[]
  }

  export interface FindAll {
    findAll(input: FindAll.Input): Promise<FindAll.Output>
  }

  export namespace FindOne {
    export type Input = {
      where: {
        id?: string
      }
    }
    export type Output = IDisciplineGroupPost | null
  }

  export interface FindOne {
    findOne(input: FindOne.Input): Promise<FindOne.Output>
  }

  export namespace DeleteOne {
    export type Input = {
      where: {
        id?: string
      }
    }
    export type Output = void
  }

  export interface DeleteOne {
    deleteOne(input: DeleteOne.Input): Promise<DeleteOne.Output>
  }

  export namespace DeleteAll {
    export type Input = {
      where: {
        disciplineGroupId?: string
      }
    }
    export type Output = void
  }

  export interface DeleteAll {
    deleteAll(input: DeleteAll.Input): Promise<DeleteAll.Output>
  }
}
