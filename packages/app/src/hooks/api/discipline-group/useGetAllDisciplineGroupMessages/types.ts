import { IDisciplineGroupMessage } from '@shared/entities'

export namespace IUseGetAllDisciplineGroupMessages {
  export type Params = {
    disciplineGroupId: string
  }

  export type Query = {
    nextCursor?: string
    limit?: number
  }

  export type Callback = (
    disciplineGroupMessage: IDisciplineGroupMessage,
  ) => void

  export type Output = {
    isLoading: boolean
    isFetchingMore: boolean
    hasNextPage: boolean
    disciplineGroupMessages: IDisciplineGroupMessage[]
    fetchNextPage: () => void
  }
}
