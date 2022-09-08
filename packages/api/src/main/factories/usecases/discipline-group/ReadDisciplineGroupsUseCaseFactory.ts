import { IReadDisciplineGroupsUseCase } from '@/domain/usecases'
import { ReadDisciplineGroupsUseCase } from '@/data/usecases/discipline-group'
import { makeDisciplineGroupRepository } from '@/main/factories/repositories'

export const makeReadDisciplineGroupsUseCase =
  (): IReadDisciplineGroupsUseCase => {
    const disciplineGroupRepository = makeDisciplineGroupRepository()

    return new ReadDisciplineGroupsUseCase(disciplineGroupRepository)
  }
