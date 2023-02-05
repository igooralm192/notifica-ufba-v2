export namespace IUseDeleteDisciplineGroup {
  export type Params = {
    disciplineGroupId: string
  }

  export type Input = { params: Params }

  export type Output = {
    isDeleting: boolean
    delete: (input: Input) => Promise<void>
  }
}
