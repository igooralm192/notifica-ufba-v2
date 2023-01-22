import { ICreateGroupEndpoint } from '@/api/discipline/types'

export namespace IUseCreateDisciplineGroup {
  export type Params = ICreateGroupEndpoint.Params
  export type Body = ICreateGroupEndpoint.Body

  export type Output = {
    isCreating: boolean
    create: (input: Params & Body) => Promise<void>
  }
}
