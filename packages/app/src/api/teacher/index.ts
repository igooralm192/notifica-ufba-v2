import { IPatchMyTeacherEndpoint } from '@/api/teacher/types'
import { TeacherMapper } from '@/mappers'
import { api } from '@/services/api'

export const patchMyTeacher = async ({
  name,
}: IPatchMyTeacherEndpoint.Body): Promise<IPatchMyTeacherEndpoint.Response> => {
  const response = await api.patch(`/teachers/me`, {
    user: { name },
  })

  const { teacher } = response.data

  return {
    teacher: TeacherMapper.toEntity(teacher),
  }
}
