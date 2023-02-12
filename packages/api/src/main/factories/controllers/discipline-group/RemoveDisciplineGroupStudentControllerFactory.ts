import { RemoveDisciplineGroupStudentController } from '@/application/controllers/discipline-group'
import { makeRemoveDisciplineGroupStudentUseCase } from '@/main/factories/usecases'

export const makeRemoveDisciplineGroupStudentController = () => {
  const removeDisciplineGroupStudentUseCase =
    makeRemoveDisciplineGroupStudentUseCase()

  return new RemoveDisciplineGroupStudentController(
    removeDisciplineGroupStudentUseCase,
  )
}
