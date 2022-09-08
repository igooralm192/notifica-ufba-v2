// import { CreateUserError } from '@/domain/errors'
// import { mockUser, mockCreateUserInput } from '@/domain/mocks'

// import { MockedHashCryptography } from '@/data/mocks/cryptography'
// import { MockedUserRepository } from '@/data/mocks/repositories'

// import faker from 'faker'

// import { CreateUserUseCase } from './CreateUserUseCase'

// const makeSUT = () => {
//   const createUserInput = mockCreateUserInput()
//   const hashedPassword = faker.internet.password()
//   const user = mockUser()

//   const userRepository = new MockedUserRepository()
//   const hashCryptography = new MockedHashCryptography()
//   const createUserUseCase = new CreateUserUseCase(
//     userRepository,
//     hashCryptography,
//     userRepository,
//   )

//   const findOneSpy = jest.spyOn(userRepository, 'findOne')
//   findOneSpy.mockResolvedValue(null)

//   const generateHashSpy = jest.spyOn(hashCryptography, 'generate')
//   generateHashSpy.mockResolvedValue(hashedPassword)

//   const createUserSpy = jest.spyOn(userRepository, 'create')
//   createUserSpy.mockResolvedValue(user)

//   return {
//     SUT: createUserUseCase,
//     findOneSpy,
//     generateHashSpy,
//     createUserSpy,
//     createUserInput,
//     hashedPassword,
//     user,
//   }
// }

// describe('CreateUserUseCase', () => {
//   it('should create a user and return user info', async () => {
//     const { SUT, createUserInput, user } = makeSUT()

//     const resultOrError = await SUT.run(createUserInput)
//     const result = resultOrError.right()

//     expect(result).toMatchObject({ user })
//   })

//   it('should call hash dependency to generate hashed password', async () => {
//     const { SUT, generateHashSpy, createUserInput } = makeSUT()

//     await SUT.run(createUserInput)

//     expect(generateHashSpy).toHaveBeenCalledWith({
//       payload: createUserInput.password,
//     })
//   })

//   it('should call generate hash password with param password as payload', async () => {
//     const { SUT, generateHashSpy, createUserInput } = makeSUT()

//     await SUT.run(createUserInput)

//     expect(generateHashSpy).toHaveBeenCalledWith({
//       payload: createUserInput.password,
//     })
//   })

//   it('should call create user repository with user params and hashed password', async () => {
//     const { SUT, createUserSpy, createUserInput, hashedPassword } = makeSUT()

//     await SUT.run(createUserInput)

//     const { name, email, type } = createUserInput

//     expect(createUserSpy).toHaveBeenCalledWith({
//       name,
//       email,
//       password: hashedPassword,
//       type,
//     })
//   })

//   it('should return error if user already exists', async () => {
//     const { SUT, findOneSpy, createUserInput, user } = makeSUT()

//     findOneSpy.mockResolvedValueOnce(user)

//     const resultOrError = await SUT.run(createUserInput)
//     const result = resultOrError.left()

//     expect(result).toBeInstanceOf(CreateUserError.UserAlreadyExistsError)
//   })
// })
