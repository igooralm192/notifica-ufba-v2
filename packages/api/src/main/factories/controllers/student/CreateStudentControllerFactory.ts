import { CreateStudentController } from '@/application/controllers/student'
import { makeCreateStudentUseCase } from '@/main/factories/usecases'
import { makeCreateStudentValidation } from '@/main/factories/validation'

export const makeCreateStudentController = () => {
  const createStudentValidation = makeCreateStudentValidation()
  const createStudentUseCase = makeCreateStudentUseCase()

  return new CreateStudentController(
    createStudentValidation,
    createStudentUseCase,
  )
}
