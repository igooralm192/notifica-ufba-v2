// import { CreateStudentError } from '@/domain/errors'
// import {
//   mockCreateStudentInput,
//   mockCreateUserOutput,
//   mockStudent,
//   mockUser,
//   MockedCreateUserUseCase,
// } from '@/domain/mocks'
// import { BaseError } from '@/domain/helpers'
// import { left, right } from '@shared/utils'

// import { MockedStudentRepository } from '@/data/mocks/repositories'

// import faker from 'faker'

// import { CreateStudentUseCase } from './CreateStudentUseCase'

// const makeSUT = () => {
//   const user = mockUser()
//   const createStudentInput = mockCreateStudentInput()
//   const createUserOutput = mockCreateUserOutput(user)
//   const student = mockStudent(user)

//   const studentRepository = new MockedStudentRepository()
//   const createUserUseCase = new MockedCreateUserUseCase()
//   const createStudentUseCase = new CreateStudentUseCase(
//     studentRepository,
//     createUserUseCase,
//     studentRepository,
//   )

//   const findOneSpy = jest.spyOn(studentRepository, 'findOne')
//   findOneSpy.mockResolvedValue(null)

//   const createUserUseCaseSpy = jest.spyOn(createUserUseCase, 'run')
//   createUserUseCaseSpy.mockResolvedValue(right(createUserOutput))

//   const createStudentSpy = jest.spyOn(studentRepository, 'create')
//   createStudentSpy.mockResolvedValue(student)

//   return {
//     SUT: createStudentUseCase,
//     findOneSpy,
//     createUserUseCaseSpy,
//     createStudentSpy,
//     createStudentInput,
//     createUserOutput,
//     user,
//     student,
//   }
// }

// describe('CreateStudentUseCase', () => {
//   it('should create a student and return student info', async () => {
//     const { SUT, createStudentInput, student } = makeSUT()

//     const resultOrError = await SUT.run(createStudentInput)
//     const result = resultOrError.right()

//     expect(result).toMatchObject({ student })
//   })

//   it('should call find one repository dependency', async () => {
//     const { SUT, findOneSpy, createStudentInput } = makeSUT()

//     await SUT.run(createStudentInput)

//     expect(findOneSpy).toHaveBeenCalledWith({
//       matriculation: createStudentInput.matriculation,
//     })
//   })

//   it('should call create user usecase with student input', async () => {
//     const { SUT, createUserUseCaseSpy, createStudentInput } = makeSUT()

//     await SUT.run(createStudentInput)

//     expect(createUserUseCaseSpy).toHaveBeenCalledWith({
//       name: createStudentInput.name,
//       email: createStudentInput.email,
//       password: createStudentInput.password,
//     })
//   })

//   it('should call create student repository with student and created user params', async () => {
//     const { SUT, createStudentSpy, createStudentInput, createUserOutput } =
//       makeSUT()

//     await SUT.run(createStudentInput)

//     expect(createStudentSpy).toHaveBeenCalledWith({
//       matriculation: createStudentInput.matriculation,
//       course: createStudentInput.course,
//       userId: createUserOutput.user.id,
//     })
//   })

//   it('should return error if create user usecase returns errors', async () => {
//     const { SUT, createUserUseCaseSpy, createStudentInput } = makeSUT()

//     const createUserError = new BaseError(
//       faker.random.word(),
//       faker.random.words(),
//     )
//     createUserUseCaseSpy.mockResolvedValueOnce(left(createUserError))

//     const resultOrError = await SUT.run(createStudentInput)
//     const result = resultOrError.left()

//     expect(result).toEqual(createUserError)
//   })

//   it('should return error if student already exists', async () => {
//     const { SUT, findOneSpy, createStudentInput, student } = makeSUT()

//     findOneSpy.mockResolvedValueOnce(student)

//     const resultOrError = await SUT.run(createStudentInput)
//     const result = resultOrError.left()

//     expect(result).toBeInstanceOf(CreateStudentError.StudentAlreadyExistsError)
//   })
// })
