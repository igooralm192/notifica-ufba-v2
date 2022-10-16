export namespace IUseCreateDisciplineGroupPost {
  export type Params = {
    disciplineGroupId: string
  }

  export type Body = {
    content: string
  }

  export type Output = {
    isCreating: boolean
    create: (input: Params & Body) => Promise<void>
  }
}
