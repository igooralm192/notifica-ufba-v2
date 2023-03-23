import { ICreateMessageEndpoint } from "@/api/discipline-group/types"

export namespace IUseCreateDisciplineGroupMessage {
  export type Params = ICreateMessageEndpoint.Params
  export type Body = ICreateMessageEndpoint.Body

  export type Input = {
    params: Params
    body: Body
  }

  export type Output = {
    isCreating: boolean
    create: (input: Input) => Promise<void>
  }
}
