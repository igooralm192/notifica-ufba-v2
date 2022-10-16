import { IPatchMyUserEndpoint } from '@/api/user/types'

export namespace IUseUpdateMyUser {
  export type Params = IPatchMyUserEndpoint.Request

  export type Output = {
    isUpdating: boolean
    update: (input: Params) => Promise<IPatchMyUserEndpoint.Response>
  }
}
