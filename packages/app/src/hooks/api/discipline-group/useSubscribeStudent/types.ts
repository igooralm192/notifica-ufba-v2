import { ISubscribeStudentEndpoint } from '@/api/discipline-group/types'

export namespace IUseSubscribeStudent {
  export type Params = ISubscribeStudentEndpoint.Request

  export type Output = {
    isSubscribing: boolean
    subscribe: (input: IUseSubscribeStudent.Params) => Promise<void>
  }
}
