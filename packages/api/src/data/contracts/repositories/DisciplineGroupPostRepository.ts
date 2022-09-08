import { IDisciplineGroupPost } from '@shared/entities'

export type IDisciplineGroupPostRepositoryListInput = {
  where?: any
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

  export namespace FindAllByDisciplineGroupId {
    export type Input = IDisciplineGroupPostRepositoryListInput
    export type Output = {
      results: IDisciplineGroupPost[]
      total: number
    }
  }

  export interface FindAllByDisciplineGroupId {
    findAllByDisciplineGroupId(
      disciplineGroupId: string,
      input: FindAllByDisciplineGroupId.Input,
    ): Promise<FindAllByDisciplineGroupId.Output>
  }
}
