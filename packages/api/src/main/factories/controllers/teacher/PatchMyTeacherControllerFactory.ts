import { PatchMyTeacherController } from '@/application/controllers/teacher'
import { makeUpdateTeacherUseCase } from '@/main/factories/usecases'
import { makeUpdateTeacherValidation } from '@/main/factories/validation'

export const makePatchMyTeacherController = () => {
  const updateTeacherValidation = makeUpdateTeacherValidation()
  const updateTeacherUseCase = makeUpdateTeacherUseCase()

  return new PatchMyTeacherController(
    updateTeacherValidation,
    updateTeacherUseCase,
  )
}
