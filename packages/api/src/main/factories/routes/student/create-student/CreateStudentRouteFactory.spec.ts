import { StudentAlreadyExistsError } from '@/domain/errors'
import { mockCreateStudentInput } from '@/domain/mocks'

import { CreateStudentUseCase } from '@/data/usecases/student'
import { CreateStudentController } from '@/application/controllers/student/create-student'
import { InternalServerError, ValidationError } from '@/application/errors'
import { usePrismaTestClient } from '@/infra/database/prisma/helpers'
import { makeApp } from '@/main/config/app'

import express from 'express'
import faker from 'faker'
import request from 'supertest'

let app: express.Express

const makeSUT = () => {
  const createStudentInput = mockCreateStudentInput()

  const createStudentRequest = request(app).post('/api/students')

  const createStudentUseCaseSpy = jest.spyOn(
    CreateStudentUseCase.prototype,
    'run',
  )

  const createStudentControllerSpy = jest.spyOn(
    CreateStudentController.prototype,
    'handle',
  )

  return {
    SUT: createStudentRequest,
    createStudentUseCaseSpy,
    createStudentControllerSpy,
    createStudentInput,
  }
}

describe('POST /students', () => {
  const getClient = usePrismaTestClient(async () => {
    app = makeApp()
  })

  afterEach(async () => {
    await getClient().student.deleteMany()
    await getClient().user.deleteMany()
  })

  it('should return 200 on success', async () => {
    const { SUT, createStudentInput } = makeSUT()

    const response = await SUT.send(createStudentInput)

    expect(response.status).toBe(200)
    expect(response.body).toMatchObject({
      student: {
        id: expect.any(String),
        matriculation: createStudentInput.matriculation,
        course: createStudentInput.course,
        user: expect.objectContaining({
          id: expect.any(String),
          name: createStudentInput.name,
          email: createStudentInput.email,
          type: 'STUDENT',
        }),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
    })
  })

  it('should return 400 on validation error', async () => {
    const { SUT, createStudentInput } = makeSUT()

    const response = await SUT.send({
      ...createStudentInput,
      email: faker.random.word(),
    })

    expect(response.status).toBe(400)
    expect(response.body).toMatchObject({
      code: ValidationError.name,
    })
  })

  it('should return 403 on student already created', async () => {
    const { SUT, createStudentInput } = makeSUT()

    const { name, email, password, matriculation, course } = createStudentInput

    await getClient().student.create({
      data: {
        matriculation,
        course,
        user: {
          create: { name, email, password },
        },
      },
    })

    const response = await SUT.send(createStudentInput)

    expect(response.status).toBe(403)
    expect(response.body).toMatchObject({
      code: StudentAlreadyExistsError.name,
    })
  })

  it('should return 500 on usecase unexpected error', async () => {
    const { SUT, createStudentUseCaseSpy, createStudentInput } = makeSUT()

    createStudentUseCaseSpy.mockImplementationOnce(async () => {
      throw new Error()
    })

    const response = await SUT.send(createStudentInput)

    expect(response.status).toBe(500)
    expect(response.body).toMatchObject({
      code: InternalServerError.name,
    })
  })

  it('should return 500 on controller unexpected error', async () => {
    const { SUT, createStudentControllerSpy, createStudentInput } = makeSUT()

    createStudentControllerSpy.mockImplementationOnce(async () => {
      const error = new Error('any_error_message')
      error.stack = 'any_stack'
      throw error
    })

    const response = await SUT.send(createStudentInput)

    expect(response.status).toBe(500)
    expect(response.body).toMatchObject({
      code: InternalServerError.name,
      stack: 'any_stack',
    })
  })
})
