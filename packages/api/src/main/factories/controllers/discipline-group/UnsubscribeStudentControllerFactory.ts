import { UnsubscribeStudentController } from '@/application/controllers/discipline-group'
import { makeUnsubscribeStudentUseCase } from '@/main/factories/usecases'

export const makeUnsubscribeStudentController = () => {
  const subscribeStudentToDisciplineGroupUseCase =
    makeUnsubscribeStudentUseCase()

  return new UnsubscribeStudentController(
    subscribeStudentToDisciplineGroupUseCase,
  )
}
