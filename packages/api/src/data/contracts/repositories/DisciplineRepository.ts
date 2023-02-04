import { IDiscipline } from '@shared/entities'
import { IDisciplineGroupRepositoryListInput } from './DisciplineGroupRepository'

export type IDisciplineRepositoryListInput = {
  where?: {
    code?: {
      contains?: string
      mode?: 'default' | 'insensitive'
    }
    name?: {
      contains?: string
      mode?: 'default' | 'insensitive'
    }
  }
  take?: number
  skip?: number
  select?: {
    [key in keyof IDiscipline]?: boolean
  }
  include?: {
    groups: boolean | IDisciplineGroupRepositoryListInput
  }
}

export namespace ICountDisciplineRepository {
  export type Input = IDisciplineRepositoryListInput
  export type Output = number
}

export interface ICountDisciplineRepository {
  count(
    input?: ICountDisciplineRepository.Input,
  ): Promise<ICountDisciplineRepository.Output>
}

export namespace IFindAllDisciplineRepository {
  export type Input = IDisciplineRepositoryListInput
  export type Output = IDiscipline[]
}

export interface IFindAllDisciplineRepository {
  findAll(
    input?: IFindAllDisciplineRepository.Input,
  ): Promise<IFindAllDisciplineRepository.Output>
}

export namespace IFindOneDisciplineRepository {
  export type Input = {
    where: {
      id?: string
    }
    include?: {
      groups?: boolean
    }
  }
  export type Output = IDiscipline
}

export interface IFindOneDisciplineRepository {
  findOne(
    input?: IFindOneDisciplineRepository.Input,
  ): Promise<IFindOneDisciplineRepository.Output>
}
