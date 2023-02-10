import { ReadDisciplineGroupMembersController } from '@/application/controllers/discipline-group'
import { makeReadDisciplineGroupMembersUseCase } from '@/main/factories/usecases'

export const makeReadDisciplineGroupMembersController = () => {
  const readDisciplineGroupMembersUseCase =
    makeReadDisciplineGroupMembersUseCase()

  return new ReadDisciplineGroupMembersController(
    readDisciplineGroupMembersUseCase,
  )
}
