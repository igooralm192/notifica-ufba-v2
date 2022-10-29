// import { AuthenticateUserError } from '@/domain/errors'
// import {
//   mockAuthenticateUserInput,
//   mockAuthenticateUserOutput,
//   MockedAuthenticateUserUseCase,
// } from '@/domain/mocks'
// import { BaseError } from '@/domain/helpers/error'
// import { left, right } from '@shared/utils'

// import { MockedValidation } from '@/application/mocks/validation'

// import faker from 'faker'

// import { AuthenticateUserController } from '.'

// const makeSUT = () => {
//   const authenticateUserInput = mockAuthenticateUserInput()
//   const authenticateUserOutput = mockAuthenticateUserOutput()

//   const validation = new MockedValidation()
//   const authenticateUserUseCase = new MockedAuthenticateUserUseCase()
//   const authenticateUserController = new AuthenticateUserController(
//     validation,
//     authenticateUserUseCase,
//   )

//   const validateSpy = jest.spyOn(validation, 'validate')
//   validateSpy.mockReturnValue(null)

//   const authenticateUserUseCaseSpy = jest.spyOn(authenticateUserUseCase, 'run')
//   authenticateUserUseCaseSpy.mockResolvedValue(right(authenticateUserOutput))

//   return {
//     SUT: authenticateUserController,
//     validateSpy,
//     authenticateUserUseCaseSpy,
//     authenticateUserInput,
//     authenticateUserOutput,
//   }
// }

// describe('AuthenticateUserController', () => {
//   it('should call validation correctly', async () => {
//     const { SUT, validateSpy, authenticateUserInput } = makeSUT()

//     await SUT.handle({ body: authenticateUserInput })

//     expect(validateSpy).toHaveBeenCalledWith(authenticateUserInput)
//   })

//   it('should call create user usecase correctly', async () => {
//     const { SUT, authenticateUserUseCaseSpy, authenticateUserInput } = makeSUT()

//     await SUT.handle({ body: authenticateUserInput })

//     expect(authenticateUserUseCaseSpy).toHaveBeenCalledWith(
//       authenticateUserInput,
//     )
//   })

//   it('should return 200 if valid credentials are provided', async () => {
//     const {
//       SUT,
//       authenticateUserUseCaseSpy,
//       authenticateUserInput,
//       authenticateUserOutput,
//     } = makeSUT()

//     const response = await SUT.handle({ body: authenticateUserInput })

//     expect(authenticateUserUseCaseSpy).toHaveBeenCalledWith(
//       authenticateUserInput,
//     )
//     expect(response.statusCode).toBe(200)
//     expect(response.body).toMatchObject({
//       token: authenticateUserOutput.token,
//       user: {
//         id: authenticateUserOutput.user.id,
//         name: authenticateUserOutput.user.name,
//         email: authenticateUserOutput.user.email,
//         type: authenticateUserOutput.user.type,
//         createdAt: authenticateUserOutput.user.createdAt,
//         updatedAt: authenticateUserOutput.user.updatedAt,
//       },
//     })
//   })

//   it('should return 400 if validation fails', async () => {
//     const validationError = new BaseError(
//       faker.random.word(),
//       faker.random.words(),
//       {
//         key: faker.random.word(),
//         value: faker.random.word(),
//       },
//     )

//     const { SUT, validateSpy, authenticateUserInput } = makeSUT()
//     validateSpy.mockReturnValueOnce(validationError)

//     const response = await SUT.handle({ body: authenticateUserInput })

//     expect(response.statusCode).toBe(400)
//     expect(response.body).toMatchObject({
//       code: validationError.code,
//       message: validationError.message,
//       context: validationError.context,
//     })
//   })

//   it('should return 404 if user not found', async () => {
//     const authenticateUserError =
//       new AuthenticateUserError.UserDoesNotExistError()

//     const { SUT, authenticateUserUseCaseSpy, authenticateUserInput } = makeSUT()
//     authenticateUserUseCaseSpy.mockResolvedValueOnce(
//       left(authenticateUserError),
//     )

//     const response = await SUT.handle({ body: authenticateUserInput })

//     expect(response.statusCode).toBe(404)
//     expect(response.body).toMatchObject({
//       code: authenticateUserError.code,
//       message: authenticateUserError.message,
//     })
//   })

//   it('should return 401 if password is wrong', async () => {
//     const authenticateUserError = new AuthenticateUserError.WrongPasswordError()

//     const { SUT, authenticateUserUseCaseSpy, authenticateUserInput } = makeSUT()
//     authenticateUserUseCaseSpy.mockResolvedValueOnce(
//       left(authenticateUserError),
//     )

//     const httpResponse = await SUT.handle({ body: authenticateUserInput })

//     expect(httpResponse.statusCode).toBe(401)
//     expect(httpResponse.body).toMatchObject({
//       code: authenticateUserError.code,
//       message: authenticateUserError.message,
//     })
//   })
// })
