import { IDeleteDisciplineGroupPostEndpoint } from "@/api/discipline-group/types"

export namespace IUseDeleteDisciplineGroupPost {
  export type Params = IDeleteDisciplineGroupPostEndpoint.Params

  export type Input = { params: Params }

  export type Output = {
    isDeleting: boolean
    delete: (input: Input) => Promise<void>
  }
}
