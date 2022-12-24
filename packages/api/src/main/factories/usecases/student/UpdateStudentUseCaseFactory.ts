import { UpdateStudentUseCase } from '@/data/usecases/student'
import { makeStudentRepository } from '@/main/factories/repositories'
import { makeUpdateUserUseCase } from '@/main/factories/usecases'

export const makeUpdateStudentUseCase = () => {
  const studentRepository = makeStudentRepository()
  const updateUserUseCase = makeUpdateUserUseCase()

  return new UpdateStudentUseCase(
    studentRepository,
    studentRepository,
    updateUserUseCase,
  )
}
