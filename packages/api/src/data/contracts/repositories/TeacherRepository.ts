import { IUserRepositoryListInput } from '@/data/contracts'
import { ITeacher } from '@shared/entities'

export type ITeacherRepositoryListInput = {
  where?: any
  take?: number
  skip?: number
  select?: {
    [key in keyof ITeacher]?: boolean
  }
  include?: {
    user?: boolean | IUserRepositoryListInput
  }
}

export namespace ITeacherRepository {
  export namespace FindOne {
    export type Input = {
      where: { userId?: string }
    }
    export type Output = ITeacher | null
  }

  export interface FindOne {
    findOne(input: FindOne.Input): Promise<FindOne.Output>
  }
}
