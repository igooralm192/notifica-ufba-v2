import { ReadDisciplineGroupMembersUseCase } from '@/data/usecases/discipline-group'
import { makeDisciplineGroupRepository } from '@/main/factories/repositories'

export const makeReadDisciplineGroupMembersUseCase = () => {
  const disciplineGroupRepository = makeDisciplineGroupRepository()

  return new ReadDisciplineGroupMembersUseCase(
    disciplineGroupRepository,
    disciplineGroupRepository,
    disciplineGroupRepository,
  )
}
