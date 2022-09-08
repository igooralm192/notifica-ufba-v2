import { ExpiredTokenError, InvalidTokenError } from '@/data/errors'

import faker from 'faker'
import jwt from 'jsonwebtoken'

import { JwtTokenCryptography } from '.'

jest.mock('jsonwebtoken', () => {
  return {
    sign: jest.fn(),
    verify: jest.fn(),
  }
})

const makeSUT = () => {
  const secretKey = faker.datatype.string()

  const tokenCryptography = new JwtTokenCryptography(secretKey)
  const jwtSignSpy = jest.spyOn(jwt, 'sign')
  const jwtVerifySpy = jest.spyOn(jwt, 'verify')

  return {
    SUT: tokenCryptography,
    jwtSignSpy,
    jwtVerifySpy,
    secretKey,
  }
}

describe('JwtTokenCryptography', () => {
  it('should call generate method with correct values', async () => {
    const payload = {
      key: faker.random.word(),
    }
    const { SUT, jwtSignSpy, secretKey } = makeSUT()

    await SUT.generate({ payload })

    expect(jwtSignSpy).toHaveBeenCalledWith(payload, secretKey, {
      expiresIn: '7d',
    })
  })

  it('should call decode method with correct values', async () => {
    const token = faker.random.word()
    const { SUT, jwtVerifySpy, secretKey } = makeSUT()

    await SUT.decode({ token })

    expect(jwtVerifySpy).toHaveBeenCalledWith(token, secretKey)
  })

  it('should call decode method with invalid token and return error', async () => {
    const token = faker.random.word()
    const { SUT, jwtVerifySpy, secretKey } = makeSUT()

    jwtVerifySpy.mockImplementationOnce(() => {
      const error = {
        name: 'JsonWebTokenError',
      }

      throw error
    })

    const resultOrError = await SUT.decode({ token })
    const error = resultOrError.left()

    expect(error).toBeInstanceOf(InvalidTokenError)
    expect(jwtVerifySpy).toHaveBeenCalledWith(token, secretKey)
  })

  it('should call decode method with expired token and return error', async () => {
    const token = faker.random.word()
    const { SUT, jwtVerifySpy, secretKey } = makeSUT()

    jwtVerifySpy.mockImplementationOnce(() => {
      const error = {
        name: 'TokenExpiredError',
      }

      throw error
    })

    const resultOrError = await SUT.decode({ token })
    const error = resultOrError.left()

    expect(error).toBeInstanceOf(ExpiredTokenError)
    expect(jwtVerifySpy).toHaveBeenCalledWith(token, secretKey)
  })
})
