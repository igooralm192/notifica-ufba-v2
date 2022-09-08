import { IDisciplineGroupMessage } from '@shared/entities'

export type IDisciplineGroupMessageRepositoryListInput = {
  where?: any
  take?: number
  skip?: number
  orderBy?: {
    [key in keyof IDisciplineGroupMessage]?: 'asc' | 'desc'
  }
}

export namespace ICreateDisciplineGroupMessageRepository {
  export type Input = {
    body: string
    sentBy: string
    sentById: string
    disciplineGroupId: string
  }
  export type Output = IDisciplineGroupMessage
}

export interface ICreateDisciplineGroupMessageRepository {
  create(
    input: ICreateDisciplineGroupMessageRepository.Input,
  ): Promise<ICreateDisciplineGroupMessageRepository.Output>
}

export namespace IFindAllDisciplineGroupMessageRepository {
  export type Input = {
    disciplineGroupId: string
    listInput: IDisciplineGroupMessageRepositoryListInput
  }
  export type Output = {
    results: IDisciplineGroupMessage[]
    total: number
  }
}

export interface IFindAllDisciplineGroupMessageRepository {
  findAll(
    input: IFindAllDisciplineGroupMessageRepository.Input,
  ): Promise<IFindAllDisciplineGroupMessageRepository.Output>
}
