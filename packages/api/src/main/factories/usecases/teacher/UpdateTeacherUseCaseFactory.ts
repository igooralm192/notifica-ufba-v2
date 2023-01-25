import { UpdateTeacherUseCase } from '@/data/usecases/teacher'
import { makeTeacherRepository } from '@/main/factories/repositories'
import { makeUpdateUserUseCase } from '@/main/factories/usecases'

export const makeUpdateTeacherUseCase = () => {
  const teacherRepository = makeTeacherRepository()
  const updateUserUseCase = makeUpdateUserUseCase()

  return new UpdateTeacherUseCase(
    teacherRepository,
    updateUserUseCase,
  )
}
