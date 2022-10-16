import { IDisciplineGroup } from '@shared/entities'

export namespace IUseUnsubscribeStudent {
  export type Params = {
    disciplineGroupId: string
  }

  export type Output = {
    isUnsubscribing: boolean
    unsubscribe: (params: IUseUnsubscribeStudent.Params) => Promise<void>
  }
}
