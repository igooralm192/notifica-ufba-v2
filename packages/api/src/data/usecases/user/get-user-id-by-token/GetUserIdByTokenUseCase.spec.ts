import { BaseError } from '@/domain/helpers'
import { left, right } from '@shared/utils'
import { MockedTokenCryptography } from '@/data/mocks/cryptography'

import faker from 'faker'

import { GetUserIdByTokenUseCase } from './GetUserIdByTokenUseCase'

const makeSUT = () => {
  const token = faker.datatype.uuid()
  const userId = faker.datatype.uuid()

  const tokenCryptography = new MockedTokenCryptography()
  const getUserIdByTokenUseCase = new GetUserIdByTokenUseCase(tokenCryptography)

  const decodeTokenSpy = jest.spyOn(tokenCryptography, 'decode')
  decodeTokenSpy.mockResolvedValue(right({ id: userId }))

  return {
    SUT: getUserIdByTokenUseCase,
    decodeTokenSpy,
    token,
    userId,
  }
}

describe('GetUserIdByTokenUseCase', () => {
  it('should call decode token correctly', async () => {
    const { SUT, decodeTokenSpy, token } = makeSUT()

    await SUT.run({ token })

    expect(decodeTokenSpy).toHaveBeenCalledWith({ token })
  })

  it('should be able to get user id by token', async () => {
    const { SUT, token, userId } = makeSUT()

    const resultOrError = await SUT.run({ token })
    const result = resultOrError.right()

    expect(result).toMatchObject({ userId })
  })

  it('should return error if decode token returns some error', async () => {
    const { SUT, decodeTokenSpy, token } = makeSUT()

    decodeTokenSpy.mockResolvedValue(
      left(new BaseError('any-code', 'any-message')),
    )

    const resultOrError = await SUT.run({ token })
    const error = resultOrError.left()

    expect(error).toEqual(new BaseError('any-code', 'any-message'))
  })
})
