import { UserDoesNotExistError, WrongPasswordError } from '@/domain/errors'
import { mockCreateUserInput } from '@/domain/mocks'

import { AuthenticateUserUseCase } from '@/data/usecases/user'
import { AuthenticateUserController } from '@/application/controllers/user'
import { InternalServerError, ValidationError } from '@/application/errors'
import { usePrismaTestClient } from '@/infra/database/prisma/helpers'
import { makeApp } from '@/main/config/app'

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import express from 'express'
import faker from 'faker'
import request from 'supertest'

let app: express.Express

const userIds = []

const makeSUT = async (client: PrismaClient) => {
  const input = mockCreateUserInput()

  const requestTest = request(app)

  const usecaseSpy = jest.spyOn(AuthenticateUserUseCase.prototype, 'run')
  const controllerSpy = jest.spyOn(
    AuthenticateUserController.prototype,
    'handle',
  )

  const user = await client.user.create({
    data: {
      name: input.name,
      email: input.email,
      // TODO: Use bcrypt salt from .env
      password: await bcrypt.hash(input.password, 10),
    },
  })

  userIds.push(user.id)

  return {
    SUT: requestTest,
    usecaseSpy,
    controllerSpy,
    input,
    user,
  }
}

describe('POST /auth/user', () => {
  const getClient = usePrismaTestClient(async () => {
    app = makeApp()
  })

  afterEach(async () => {
    await getClient().user.deleteMany({
      where: { id: { in: userIds } },
    })

    userIds.splice(0, userIds.length)
  })

  it('should return 200 on success', async () => {
    const { SUT, input, user } = await makeSUT(getClient())

    const response = await SUT.post('/api/auth/user').send({
      email: input.email,
      password: input.password,
    })

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      token: expect.any(String),
      user: {
        id: user.id,
        name: input.name,
        email: input.email,
        type: user.type,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      },
    })
  })

  it('should return 400 on validation error', async () => {
    const { SUT, input } = await makeSUT(getClient())

    const response = await SUT.post('/api/auth/user').send({
      ...input,
      email: faker.random.word(),
    })

    expect(response.status).toBe(400)
    expect(response.body).toMatchObject({
      code: ValidationError.name,
    })
  })

  it('should return 404 on user not found', async () => {
    const { SUT } = await makeSUT(getClient())

    const response = await SUT.post('/api/auth/user').send({
      email: faker.internet.email(),
      password: faker.internet.email(),
    })

    expect(response.status).toBe(404)
    expect(response.body).toMatchObject({
      code: UserDoesNotExistError.name,
    })
  })

  it('should return 401 on wrong password', async () => {
    const { SUT, input } = await makeSUT(getClient())

    const response = await SUT.post('/api/auth/user').send({
      email: input.email,
      password: faker.internet.password(6),
    })

    expect(response.status).toBe(401)
    expect(response.body).toMatchObject({
      code: WrongPasswordError.name,
    })
  })

  it('should return 500 on usecase unexpected error', async () => {
    const { SUT, usecaseSpy, input } = await makeSUT(getClient())

    usecaseSpy.mockImplementationOnce(async () => {
      throw new Error()
    })

    const response = await SUT.post('/api/auth/user').send({
      email: input.email,
      password: input.password,
    })

    expect(response.status).toBe(500)
    expect(response.body).toMatchObject({
      code: InternalServerError.name,
    })
  })

  it('should return 500 on controller unexpected error', async () => {
    const { SUT, controllerSpy, input } = await makeSUT(getClient())

    controllerSpy.mockImplementationOnce(async () => {
      const error = new Error('any_error_message')
      error.stack = 'any_stack'
      throw error
    })

    const response = await SUT.post('/api/auth/user').send({
      email: input.email,
      password: input.password,
    })

    expect(response.status).toBe(500)
    expect(response.body).toMatchObject({
      code: InternalServerError.name,
      stack: 'any_stack',
    })
  })
})
