import { IAuthenticateUserUseCase } from '@/domain/usecases'

import { GetUserByIdUseCase } from '@/data/usecases/user'
import { GetMyUserController } from '@/application/controllers/user'
import { InternalServerError } from '@/application/errors'
import { usePrismaTestClient } from '@/infra/database/prisma/helpers'
import { makeApp } from '@/main/config/app'

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import express from 'express'
import faker from 'faker'
import jwt from 'jsonwebtoken'
import request from 'supertest'

let app: express.Express

const userIds = []

const makeSUT = async (client: PrismaClient) => {
  const password = faker.internet.password()

  const user = await client.user.create({
    data: {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: await bcrypt.hash(password, 10),
    },
  })

  userIds.push(user.id)

  const requestTest = request(app)

  const usecaseSpy = jest.spyOn(GetUserByIdUseCase.prototype, 'run')
  const controllerSpy = jest.spyOn(GetMyUserController.prototype, 'handle')

  return {
    SUT: requestTest,
    usecaseSpy,
    controllerSpy,
    user,
    password,
  }
}

describe('GET /users/me', () => {
  const getClient = usePrismaTestClient(async () => {
    app = makeApp()
  })

  afterEach(async () => {
    await getClient().user.deleteMany({
      where: { id: { in: userIds } },
    })

    userIds.splice(0, userIds.length)
  })

  it('should return 200 with user data', async () => {
    const { SUT, user, password } = await makeSUT(getClient())

    const loginResponse = await SUT.post('/api/auth/user').send({
      email: user.email,
      password,
    })

    const { token } = loginResponse.body as IAuthenticateUserUseCase.Output

    const response = await SUT.get(`/api/users/me`).set(
      'Authorization',
      `Bearer ${token}`,
    )

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        type: user.type,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      },
    })
  })

  it('should return 400 if is missing token', async () => {
    const { SUT } = await makeSUT(getClient())

    const response = await SUT.get(`/api/users/me`)

    expect(response.status).toBe(400)
  })

  it('should return 401 with invalid token', async () => {
    const { SUT } = await makeSUT(getClient())

    const response = await SUT.get(`/api/users/me`).set(
      'Authorization',
      `Bearer any-token`,
    )

    expect(response.status).toBe(401)
  })

  it('should return 404 if user does not exist', async () => {
    const { SUT } = await makeSUT(getClient())

    const token = jwt.sign(
      { id: 'any-user-id' },
      process.env.JWT_SECRET_KEY || 'MY_SECRET',
    )

    const response = await SUT.get(`/api/users/me`).set(
      'Authorization',
      `Bearer ${token}`,
    )

    expect(response.status).toBe(404)
  })

  it('should return 500 on usecase unexpected error', async () => {
    const { SUT, usecaseSpy, user, password } = await makeSUT(getClient())

    usecaseSpy.mockImplementationOnce(async () => {
      throw new Error()
    })

    const loginResponse = await SUT.post('/api/auth/user').send({
      email: user.email,
      password,
    })

    const { token } = loginResponse.body as IAuthenticateUserUseCase.Output

    const response = await SUT.get(`/api/users/me`).set(
      'Authorization',
      `Bearer ${token}`,
    )

    expect(response.status).toBe(500)
    expect(response.body).toMatchObject({
      code: InternalServerError.name,
    })
  })

  it('should return 500 on controller unexpected error', async () => {
    const { SUT, controllerSpy, user, password } = await makeSUT(getClient())

    controllerSpy.mockImplementationOnce(async () => {
      throw new Error()
    })

    const loginResponse = await SUT.post('/api/auth/user').send({
      email: user.email,
      password,
    })

    const { token } = loginResponse.body as IAuthenticateUserUseCase.Output

    const response = await SUT.get(`/api/users/me`).set(
      'Authorization',
      `Bearer ${token}`,
    )

    expect(response.status).toBe(500)
    expect(response.body).toMatchObject({
      code: InternalServerError.name,
    })
  })
})
