import { IReadDisciplineGroupUseCase } from '@/domain/usecases'
import { ReadDisciplineGroupUseCase } from '@/data/usecases/discipline-group'
import { makeDisciplineGroupRepository } from '@/main/factories/repositories'

export const makeReadDisciplineGroupUseCase =
  (): IReadDisciplineGroupUseCase => {
    const disciplineGroupRepository = makeDisciplineGroupRepository()

    return new ReadDisciplineGroupUseCase(disciplineGroupRepository)
  }
