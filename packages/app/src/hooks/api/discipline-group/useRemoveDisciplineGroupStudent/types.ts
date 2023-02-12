import { IRemoveDisciplineGroupStudentEndpoint } from "@/api/discipline-group/types"

export namespace IUseRemoveDisciplineGroupStudent {
  export type Params = IRemoveDisciplineGroupStudentEndpoint.Params

  export type Input = { params: Params }

  export type Output = {
    isRemoving: boolean
    remove: (input: Input) => Promise<void>
  }
}
