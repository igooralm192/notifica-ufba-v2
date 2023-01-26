import {
  DisciplineGroupDoesNotExistError,
  StudentDoesNotExistError,
} from '@/domain/errors'

import { SubscribeStudentToDisciplineGroupUseCase } from '@/data/usecases/discipline-group'
import { SubscribeStudentToDisciplineGroupController } from '@/application/controllers/discipline-group'
import { InternalServerError, ValidationError } from '@/application/errors'
import { usePrismaTestClient } from '@/infra/database/prisma/helpers'
import { makeApp } from '@/main/config/app'

import { PrismaClient } from '@prisma/client'
import express from 'express'
import faker from 'faker'
import request from 'supertest'

let app: express.Express

const userIds = []
const studentIds = []
const disciplineIds = []
const disciplineGroupIds = []

const makeSUT = async (client: PrismaClient) => {
  const disciplineInput = {
    name: faker.name.title(),
    code: faker.random.word(),
    course: faker.name.jobTitle(),
  }

  const disciplineGroupInput = {
    code: faker.random.word(),
    semester: faker.random.word(),
    description: faker.random.words(),
    place: faker.address.city(),
    classTime: faker.date.recent(),
    menuUrl: faker.internet.url(),
  }

  const student = await client.student.create({
    data: {
      matriculation: faker.datatype.uuid(),
      course: faker.company.companyName(),
      user: {
        create: {
          name: faker.name.findName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
        },
      },
    },
  })

  const discipline = await client.discipline.create({
    data: {
      ...disciplineInput,
      groups: {
        create: disciplineGroupInput,
      },
    },
    include: { groups: true },
  })

  userIds.push(student.userId)
  studentIds.push(student.id)
  disciplineIds.push(discipline.id)
  disciplineGroupIds.push(discipline.groups[0].id)

  const requestTest = request(app)

  const usecaseSpy = jest.spyOn(
    SubscribeStudentToDisciplineGroupUseCase.prototype,
    'run',
  )

  const controllerSpy = jest.spyOn(
    SubscribeStudentToDisciplineGroupController.prototype,
    'handle',
  )

  return {
    SUT: requestTest,
    usecaseSpy,
    controllerSpy,
    student,
    discipline,
  }
}

describe('POST /discipline-groups/:disciplineGroupId/subscribe', () => {
  const getClient = usePrismaTestClient(async () => {
    app = makeApp()
  })

  afterEach(async () => {
    await getClient().disciplineGroup.deleteMany({
      where: { id: { in: disciplineGroupIds } },
    })
    await getClient().discipline.deleteMany({
      where: { id: { in: disciplineIds } },
    })
    await getClient().student.deleteMany({
      where: { id: { in: studentIds } },
    })
    await getClient().user.deleteMany({
      where: { id: { in: userIds } },
    })

    disciplineGroupIds.splice(0, disciplineGroupIds.length)
    disciplineIds.splice(0, disciplineIds.length)
    studentIds.splice(0, studentIds.length)
    userIds.splice(0, userIds.length)
  })

  it('should return 204 on success', async () => {
    const { SUT, student, discipline } = await makeSUT(getClient())

    const response = await SUT.post(
      `/api/discipline-groups/${discipline.groups[0].id}/subscribe`,
    ).send({
      studentId: student.id,
    })

    const findDisciplineGroup = await getClient().disciplineGroup.findFirst({
      where: { id: discipline.groups[0].id },
    })

    expect(response.status).toBe(204)
    expect(findDisciplineGroup.studentIds).toContain(student.id)
  })

  it('should return 400 on validation error', async () => {
    const { SUT, discipline } = await makeSUT(getClient())

    const response = await SUT.post(
      `/api/discipline-groups/${discipline.groups[0].id}/subscribe`,
    ).send({})

    expect(response.status).toBe(400)
    expect(response.body).toMatchObject({
      code: ValidationError.name,
      context: { key: 'studentId' },
    })
  })

  it('should return 404 if discipline group does not exist', async () => {
    const { SUT, student } = await makeSUT(getClient())

    const response = await SUT.post(
      `/api/discipline-groups/any-discipline-group-id/subscribe`,
    ).send({ studentId: student.id })

    expect(response.status).toBe(404)
    expect(response.body).toMatchObject({
      code: DisciplineGroupDoesNotExistError.name,
    })
  })

  it('should return 404 if student does not exist', async () => {
    const { SUT, discipline } = await makeSUT(getClient())

    const response = await SUT.post(
      `/api/discipline-groups/${discipline.groups[0].id}/subscribe`,
    ).send({ studentId: 'any-student-id' })

    expect(response.status).toBe(404)
    expect(response.body).toMatchObject({
      code: StudentDoesNotExistError.name,
    })
  })

  it('should return 500 on usecase unexpected error', async () => {
    const { SUT, usecaseSpy, student, discipline } = await makeSUT(getClient())

    usecaseSpy.mockImplementationOnce(async () => {
      throw new Error()
    })

    const response = await SUT.post(
      `/api/discipline-groups/${discipline.groups[0].id}/subscribe`,
    ).send({ studentId: student.id })

    expect(response.status).toBe(500)
    expect(response.body).toMatchObject({
      code: InternalServerError.name,
    })
  })

  it('should return 500 on controller unexpected error', async () => {
    const { SUT, controllerSpy, student, discipline } = await makeSUT(
      getClient(),
    )

    controllerSpy.mockImplementationOnce(async () => {
      throw new Error()
    })

    const response = await SUT.post(
      `/api/discipline-groups/${discipline.groups[0].id}/subscribe`,
    ).send({ studentId: student.id })

    expect(response.status).toBe(500)
    expect(response.body).toMatchObject({
      code: InternalServerError.name,
    })
  })
})
