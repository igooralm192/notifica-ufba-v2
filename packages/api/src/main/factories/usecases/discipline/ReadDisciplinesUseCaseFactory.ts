import { IReadDisciplinesUseCase } from '@/domain/usecases'
import { ReadDisciplinesUseCase } from '@/data/usecases/discipline'
import { makeDisciplineRepository } from '@/main/factories/repositories'

export const makeReadDisciplinesUseCase = (): IReadDisciplinesUseCase => {
  const disciplineRepository = makeDisciplineRepository()

  return new ReadDisciplinesUseCase(disciplineRepository, disciplineRepository)
}
