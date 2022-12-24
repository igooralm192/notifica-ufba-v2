import { PatchMyStudentController } from '@/application/controllers/student'
import { makeUpdateStudentUseCase } from '@/main/factories/usecases'
import { makeUpdateStudentValidation } from '@/main/factories/validation'

export const makePatchMyStudentController = () => {
  const updateStudentValidation = makeUpdateStudentValidation()
  const updateStudentUseCase = makeUpdateStudentUseCase()

  return new PatchMyStudentController(
    updateStudentValidation,
    updateStudentUseCase,
  )
}
