import {
  IDiscipline,
  IDisciplineGroup,
  IStudent,
  ITeacher,
  IUser,
} from '@shared/entities'

import faker from 'faker'
import { ObjectId } from 'mongodb'

export const mockDiscipline = (
  discipline?: Partial<IDiscipline>,
): IDiscipline => {
  return {
    id: new ObjectId().toString(),
    name: faker.name.title(),
    code: faker.random.word(),
    course: faker.name.jobTitle(),
    createdAt: faker.datatype.datetime(),
    updatedAt: faker.datatype.datetime(),
    ...discipline,
  }
}

export const mockDisciplineGroup = (
  disciplineGroup?: Partial<IDisciplineGroup>,
): IDisciplineGroup => {
  return {
    id: new ObjectId().toString(),
    code: faker.random.word(),
    semester: faker.random.word(),
    description: faker.random.words(),
    place: faker.address.city(),
    menuUrl: faker.internet.url(),
    classTime: faker.date.recent(),

    teacherId: new ObjectId().toString(),
    disciplineId: new ObjectId().toString(),

    createdAt: faker.datatype.datetime(),
    updatedAt: faker.datatype.datetime(),
    ...disciplineGroup,
  }
}

export const mockStudent = (user = mockUser()): IStudent => {
  return {
    id: new ObjectId().toString(),
    matriculation: faker.datatype.uuid(),
    course: faker.company.companyName(),
    user: user,
    userId: user?.id || new ObjectId().toString(),
    createdAt: faker.datatype.datetime(),
    updatedAt: faker.datatype.datetime(),
  }
}

export const mockTeacher = (teacher?: Partial<ITeacher>): ITeacher => {
  return {
    id: new ObjectId().toString(),
    userId: new ObjectId().toString(),
    createdAt: faker.datatype.datetime(),
    updatedAt: faker.datatype.datetime(),
    ...teacher,
  }
}

export const mockUser = (user?: Partial<IUser>): IUser => {
  return {
    id: new ObjectId().toString(),
    name: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    type: 'STUDENT',
    createdAt: faker.datatype.datetime(),
    updatedAt: faker.datatype.datetime(),
    ...user,
  }
}
