import faker from 'faker'
import bcrypt from 'bcryptjs'

import { BcryptHashCryptography } from '.'

jest.mock('bcryptjs', () => {
  return {
    hash: jest.fn(),
    compare: jest.fn(),
  }
})

const makeSUT = () => {
  const salt = faker.datatype.number()

  const hashCryptography = new BcryptHashCryptography(salt)
  const bcryptHashSpy = jest.spyOn(bcrypt, 'hash')
  const bcryptCompareSpy = jest.spyOn(bcrypt, 'compare')

  return {
    SUT: hashCryptography,
    bcryptHashSpy,
    bcryptCompareSpy,
    salt,
  }
}

describe('BcryptHashCryptography', () => {
  it('should call generate method with correct values', async () => {
    const payload = faker.random.word()
    const { SUT, bcryptHashSpy, salt } = makeSUT()

    await SUT.generate({ payload })

    expect(bcryptHashSpy).toHaveBeenCalledWith(payload, salt)
  })

  it('should call compare method with correct values', async () => {
    const payload = faker.random.word()
    const hashed = faker.random.word()
    const { SUT, bcryptCompareSpy } = makeSUT()

    await SUT.compare({ payload, hashed })

    expect(bcryptCompareSpy).toHaveBeenCalledWith(payload, hashed)
  })
})
