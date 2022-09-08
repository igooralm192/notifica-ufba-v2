import {
  IAuthenticateUserUseCase,
  ICreateStudentUseCase,
  ICreateUserUseCase,
  IReadDisciplinesUseCase,
} from '@/domain/usecases'

import faker from 'faker'

import { mockDiscipline, mockStudent, mockUser } from './entities'

export const mockAuthenticateUserOutput = (
  user = mockUser(),
): IAuthenticateUserUseCase.Output => {
  return { token: faker.datatype.uuid(), user }
}

export const mockCreateStudentOutput = (
  student = mockStudent(),
): ICreateStudentUseCase.Output => {
  return { student }
}

export const mockCreateUserOutput = (
  user = mockUser(),
): ICreateUserUseCase.Output => {
  return { user }
}

export const mockReadDisciplinesOutput = (
  disciplines = [mockDiscipline()],
): IReadDisciplinesUseCase.Output => {
  return { results: disciplines, total: disciplines.length }
}
