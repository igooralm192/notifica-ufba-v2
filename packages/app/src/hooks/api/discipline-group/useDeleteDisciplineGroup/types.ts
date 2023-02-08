import { IDeleteDisciplineGroupEndpoint } from "@/api/discipline-group/types"

export namespace IUseDeleteDisciplineGroup {
  export type Params = IDeleteDisciplineGroupEndpoint.Params

  export type Input = { params: Params }

  export type Output = {
    isDeleting: boolean
    delete: (input: Input) => Promise<void>
  }
}
