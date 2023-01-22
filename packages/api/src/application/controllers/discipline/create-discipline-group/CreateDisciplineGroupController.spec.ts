// import {
//   DisciplineGroupDoesNotExistError,
//   StudentDoesNotExistError,
// } from '@/domain/errors'
// import { MockedSubscribeStudentToDisciplineGroupUseCase } from '@/domain/mocks'
// import { BaseError } from '@/domain/helpers/error'
// import { left, right } from '@shared/utils'

// import {
//   mockSubscribeStudentToDisciplineGroupBody,
//   mockSubscribeStudentToDisciplineGroupParams,
// } from '@/application/mocks/requests'
// import { MockedValidation } from '@/application/mocks/validation'

// import faker from 'faker'

// import { SubscribeStudentToDisciplineGroupController } from '.'

// const makeSUT = () => {
//   const body = mockSubscribeStudentToDisciplineGroupBody()
//   const params = mockSubscribeStudentToDisciplineGroupParams()

//   const request = { body, params }

//   const validation = new MockedValidation()
//   const usecase = new MockedSubscribeStudentToDisciplineGroupUseCase()
//   const controller = new SubscribeStudentToDisciplineGroupController(
//     validation,
//     usecase,
//   )

//   const validateSpy = jest.spyOn(validation, 'validate')
//   validateSpy.mockReturnValue(null)

//   const usecaseSpy = jest.spyOn(usecase, 'run')
//   usecaseSpy.mockResolvedValue(right(undefined))

//   return {
//     SUT: controller,
//     validateSpy,
//     usecaseSpy,
//     request,
//   }
// }

// describe('SubscribeStudentToDisciplineGroupController', () => {
//   it('should call validation correctly', async () => {
//     const { SUT, validateSpy, request } = makeSUT()

//     await SUT.handle(request)

//     expect(validateSpy).toHaveBeenCalledWith(request.body)
//   })

//   it('should call usecase correctly', async () => {
//     const { SUT, usecaseSpy, request } = makeSUT()

//     await SUT.handle(request)

//     expect(usecaseSpy).toHaveBeenCalledWith({
//       disciplineGroupId: request.params.disciplineGroupId,
//       studentId: request.body.studentId,
//     })
//   })

//   it('should return 204 on success', async () => {
//     const { SUT, request } = makeSUT()

//     const response = await SUT.handle(request)

//     expect(response.statusCode).toBe(204)
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

//     const { SUT, validateSpy, request } = makeSUT()
//     validateSpy.mockReturnValueOnce(validationError)

//     const response = await SUT.handle(request)

//     expect(response.statusCode).toBe(400)
//     expect(response.body).toMatchObject({
//       code: validationError.code,
//       message: validationError.message,
//       context: validationError.context,
//     })
//   })

//   it('should return 404 if discipline group does not exist', async () => {
//     const error = new DisciplineGroupDoesNotExistError()

//     const { SUT, usecaseSpy, request } = makeSUT()

//     usecaseSpy.mockResolvedValueOnce(left(error))

//     const response = await SUT.handle(request)

//     expect(response.statusCode).toBe(404)
//     expect(response.body).toMatchObject({
//       code: error.code,
//       message: error.message,
//     })
//   })

//   it('should return 404 if student does not exist', async () => {
//     const error = new StudentDoesNotExistError()

//     const { SUT, usecaseSpy, request } = makeSUT()

//     usecaseSpy.mockResolvedValueOnce(left(error))

//     const response = await SUT.handle(request)

//     expect(response.statusCode).toBe(404)
//     expect(response.body).toMatchObject({
//       code: error.code,
//       message: error.message,
//     })
//   })
// })
