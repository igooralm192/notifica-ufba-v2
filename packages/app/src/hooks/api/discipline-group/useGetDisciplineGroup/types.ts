import { IDisciplineGroup } from "@shared/entities"

export namespace IUseGetDisciplineGroup {
  export type Params = {
    disciplineGroupId: string
  }

  export type Output = {
    isLoading: boolean
    disciplineGroup: IDisciplineGroup | null
  }
}
