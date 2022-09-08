import { IDisciplineGroup } from '@shared/entities'
import { ITeacherRepositoryListInput } from './DisciplineRepository'

export type IDisciplineGroupRepositoryListInput = {
  where?: {
    studentIds?: {
      equals?: string[]
      has?: string
    }
  }
  take?: number
  skip?: number
  select?: {
    [key in keyof IDisciplineGroup]?: boolean
  }
  include?: {
    discipline?: boolean
    teacher?: boolean | ITeacherRepositoryListInput
  }
  orderBy?: {
    discipline?: {
      code?: 'asc' | 'desc'
    }
  }
}

export namespace IFindAllDisciplineGroupRepository {
  export type Input = IDisciplineGroupRepositoryListInput
  export type Output = {
    results: IDisciplineGroup[]
    total: number
  }
}

export interface IFindAllDisciplineGroupRepository {
  findAll(
    input: IFindAllDisciplineGroupRepository.Input,
  ): Promise<IFindAllDisciplineGroupRepository.Output>
}

export namespace IFindOneDisciplineGroupRepository {
  export type Input = {
    where: {
      id?: string
      code?: string
    }
    include?: {
      discipline?: boolean
      teacher?: boolean | ITeacherRepositoryListInput
    }
  }
  export type Output = IDisciplineGroup | null
}

export interface IFindOneDisciplineGroupRepository {
  findOne(
    input: IFindOneDisciplineGroupRepository.Input,
  ): Promise<IFindOneDisciplineGroupRepository.Output>
}

export namespace IPushStudentDisciplineGroupRepository {
  export type Input = {
    studentId: string
  }
  export type Output = IDisciplineGroup
}

export interface IPushStudentDisciplineGroupRepository {
  pushStudent(
    disciplineGroupId: string,
    input: IPushStudentDisciplineGroupRepository.Input,
  ): Promise<IPushStudentDisciplineGroupRepository.Output>
}
