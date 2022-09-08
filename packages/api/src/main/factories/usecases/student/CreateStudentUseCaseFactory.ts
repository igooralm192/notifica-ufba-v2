import { CreateStudentUseCase } from '@/data/usecases/student'
import { makeStudentRepository } from '@/main/factories/repositories'
import { makeCreateUserUseCase } from '@/main/factories/usecases'

export const makeCreateStudentUseCase = () => {
  const studentRepository = makeStudentRepository()
  const createUserUseCase = makeCreateUserUseCase()

  return new CreateStudentUseCase(
    studentRepository,
    createUserUseCase,
    studentRepository,
  )
}
