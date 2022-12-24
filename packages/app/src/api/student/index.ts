import { StudentMapper } from '@/mappers'
import { api } from '@/services/api'

import { ICreateStudentEndpoint, IPatchMyStudentEndpoint } from './types'

export const createStudent = async ({
  name,
  email,
  password,
  matriculation,
  course,
}: ICreateStudentEndpoint.Request): Promise<ICreateStudentEndpoint.Response> => {
  const response = await api.post('/students', {
    name,
    email,
    password,
    matriculation,
    course,
  })

  const { student } = response.data

  return {
    student: StudentMapper.toEntity(student),
  }
}

export const patchMyStudent = async ({
  name,
  matriculation,
  course,
}: IPatchMyStudentEndpoint.Body): Promise<IPatchMyStudentEndpoint.Response> => {
  const response = await api.patch(`/students/me`, {
    matriculation,
    course,
    user: { name },
  })

  const { student } = response.data

  return {
    student: StudentMapper.toEntity(student),
  }
}
