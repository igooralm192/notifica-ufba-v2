import { SubscribeStudentToDisciplineGroupController } from '@/application/controllers/discipline-group'
import { makeSubscribeStudentToDisciplineGroupUseCase } from '@/main/factories/usecases'

export const makeSubscribeStudentToDisciplineGroupController = () => {
  const subscribeStudentToDisciplineGroupUseCase =
    makeSubscribeStudentToDisciplineGroupUseCase()

  return new SubscribeStudentToDisciplineGroupController(
    subscribeStudentToDisciplineGroupUseCase,
  )
}
