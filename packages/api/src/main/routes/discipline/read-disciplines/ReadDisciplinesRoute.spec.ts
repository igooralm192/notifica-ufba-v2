import { ReadDisciplinesUseCase } from '@/data/usecases/discipline'
import { ReadDisciplinesController } from '@/application/controllers/discipline'
import { InternalServerError } from '@/application/errors'
import { usePrismaTestClient } from '@/infra/database/prisma/helpers'
import { makeApp } from '@/main/config/app'

import express from 'express'
import faker from 'faker'
import request from 'supertest'

let app: express.Express

const userIds = []
const teacherIds = []
const disciplineIds = []
const disciplineGroupIds = []

const makeSUT = () => {
  const readDisciplinesRequest = request(app).get('/api/disciplines')

  const readDisciplinesUseCaseSpy = jest.spyOn(
    ReadDisciplinesUseCase.prototype,
    'run',
  )

  const readDisciplinesControllerSpy = jest.spyOn(
    ReadDisciplinesController.prototype,
    'handle',
  )

  return {
    SUT: readDisciplinesRequest,
    readDisciplinesUseCaseSpy,
    readDisciplinesControllerSpy,
  }
}

describe('GET /disciplines', () => {
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
    await getClient().teacher.deleteMany({
      where: { id: { in: teacherIds } },
    })
    await getClient().user.deleteMany({
      where: { id: { in: userIds } },
    })

    disciplineGroupIds.splice(0, disciplineGroupIds.length)
    disciplineIds.splice(0, disciplineIds.length)
    teacherIds.splice(0, teacherIds.length)
    userIds.splice(0, userIds.length)
  })

  it('should return 200 on success', async () => {
    const { SUT } = makeSUT()

    const teacherInput = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    }

    const disciplineGroupInput = {
      code: faker.random.word(),
      semester: faker.random.word(),
      description: faker.random.words(),
      place: faker.address.city(),
      classTime: faker.date.recent(),
      menuUrl: faker.internet.url(),
    }

    const disciplineInput = {
      name: faker.name.title(),
      code: faker.random.word(),
      course: faker.name.jobTitle(),
    }

    const teacher = await getClient().teacher.create({
      data: {
        user: {
          create: teacherInput,
        },
      },
      include: { user: true },
    })

    const discipline = await getClient().discipline.create({
      data: {
        ...disciplineInput,
        groups: {
          create: {
            ...disciplineGroupInput,
            teacherId: teacher.id,
          },
        },
      },
      include: { groups: true },
    })

    userIds.push(teacher.userId)
    teacherIds.push(teacher.id)
    disciplineIds.push(discipline.id)
    disciplineGroupIds.push(discipline.groups[0].id)

    const response = await SUT.send()

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      results: [
        {
          id: discipline.id,
          name: discipline.name,
          code: discipline.code,
          course: discipline.course,

          groups: [
            {
              id: discipline.groups[0].id,
              code: discipline.groups[0].code,
              semester: discipline.groups[0].semester,
              description: discipline.groups[0].description,
              place: discipline.groups[0].place,
              menuUrl: discipline.groups[0].menuUrl,
              classTime: discipline.groups[0].classTime.toISOString(),
              studentIds: [],
              teacherId: teacher.id,
              teacher: {
                id: teacher.id,
                userId: teacher.userId,
                user: {
                  id: teacher.user.id,
                  name: teacher.user.name,
                  email: teacher.user.email,
                  type: teacher.user.type,
                  createdAt: teacher.user.createdAt.toISOString(),
                  updatedAt: teacher.user.updatedAt.toISOString(),
                },
                createdAt: teacher.createdAt.toISOString(),
                updatedAt: teacher.updatedAt.toISOString(),
              },
              disciplineId: discipline.id,
              createdAt: discipline.groups[0].createdAt.toISOString(),
              updatedAt: discipline.groups[0].updatedAt.toISOString(),
            },
          ],

          createdAt: discipline.createdAt.toISOString(),
          updatedAt: discipline.updatedAt.toISOString(),
        },
      ],
      total: 1,
    })
  })

  it('should return 500 on usecase unexpected error', async () => {
    const { SUT, readDisciplinesUseCaseSpy } = makeSUT()

    readDisciplinesUseCaseSpy.mockImplementationOnce(async () => {
      throw new Error()
    })

    const response = await SUT.send()

    expect(response.status).toBe(500)
    expect(response.body).toMatchObject({
      code: InternalServerError.name,
    })
  })

  it('should return 500 on controller unexpected error', async () => {
    const { SUT, readDisciplinesControllerSpy } = makeSUT()

    readDisciplinesControllerSpy.mockImplementationOnce(async () => {
      const error = new Error('any_error_message')
      error.stack = 'any_stack'
      throw error
    })

    const response = await SUT.send()

    expect(response.status).toBe(500)
    expect(response.body).toMatchObject({
      code: InternalServerError.name,
      stack: 'any_stack',
    })
  })
})
