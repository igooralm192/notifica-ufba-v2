// import { AuthenticateUserError } from '@/domain/errors'
// import {
//   mockUser,
//   mockAuthenticateUserInput,
// } from '@/domain/mocks'

// import {
//   MockedHashCryptography,
//   MockedTokenCryptography,
// } from '@/data/mocks/cryptography'
// import { MockedUserRepository } from '@/data/mocks/repositories'

// import faker from 'faker'

// import { AuthenticateUserUseCase } from '.'

// const makeSUT = () => {
//   const authenticateUserInput = mockAuthenticateUserInput()
//   const token = faker.datatype.uuid()
//   const user = mockUser()

//   const userRepository = new MockedUserRepository()
//   const hashCryptography = new MockedHashCryptography()
//   const tokenCryptography = new MockedTokenCryptography()
//   const authenticateUserUseCase = new AuthenticateUserUseCase(
//     userRepository,
//     hashCryptography,
//     tokenCryptography,
//   )

//   const findOneSpy = jest.spyOn(userRepository, 'findOne')
//   findOneSpy.mockResolvedValue(user)

//   const compareHashSpy = jest.spyOn(hashCryptography, 'compare')
//   compareHashSpy.mockResolvedValue(true)

//   const generateTokenSpy = jest.spyOn(tokenCryptography, 'generate')
//   generateTokenSpy.mockResolvedValue(token)

//   return {
//     SUT: authenticateUserUseCase,
//     findOneSpy,
//     compareHashSpy,
//     generateTokenSpy,
//     authenticateUserInput,
//     token,
//     user,
//   }
// }

// describe('AuthenticateUserUseCase', () => {
//   it('should be able to authenticate with email and password and get an access token and user info', async () => {
//     const { SUT, generateTokenSpy, authenticateUserInput, token, user } =
//       makeSUT()

//     const resultOrError = await SUT.run(authenticateUserInput)
//     const result = resultOrError.right()

//     expect(generateTokenSpy).toHaveBeenCalledWith({
//       payload: { id: user.id },
//     })

//     expect(result).toMatchObject({ token, user })
//   })

//   it('should not be able to authenticate if user does not exist', async () => {
//     const { SUT, findOneSpy, authenticateUserInput } = makeSUT()

//     findOneSpy.mockResolvedValueOnce(null)

//     const resultOrError = await SUT.run(authenticateUserInput)
//     const error = resultOrError.left()

//     expect(findOneSpy).toHaveBeenCalledWith({
//       email: authenticateUserInput.email,
//     })
//     expect(error).toBeInstanceOf(AuthenticateUserError.UserDoesNotExistError)
//   })

//   it('should not be able to authenticate if password is wrong', async () => {
//     const { SUT, compareHashSpy, authenticateUserInput } = makeSUT()

//     compareHashSpy.mockResolvedValueOnce(false)

//     const resultOrError = await SUT.run(authenticateUserInput)
//     const error = resultOrError.left()

//     expect(compareHashSpy).toHaveBeenCalledWith(
//       expect.objectContaining({ payload: authenticateUserInput.password }),
//     )
//     expect(error).toBeInstanceOf(AuthenticateUserError.WrongPasswordError)
//   })
// })
