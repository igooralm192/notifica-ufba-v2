// import { AuthenticateUserError } from '@/domain/errors'
// import { MockedGetUserByIdUseCase, mockUser } from '@/domain/mocks'
// import { left, right } from '@shared/utils'

// import { MissingParamsError } from '@/application/errors'

// import { GetMyUserController } from '.'

// const makeSUT = () => {
//   const user = mockUser()

//   const usecase = new MockedGetUserByIdUseCase()
//   const controller = new GetMyUserController(usecase)

//   const usecaseSpy = jest.spyOn(usecase, 'run')
//   usecaseSpy.mockResolvedValue(right({ user }))

//   return {
//     SUT: controller,
//     usecaseSpy,
//     user,
//   }
// }

// describe('GetMyUserController', () => {
//   it('should call usecase correctly', async () => {
//     const { SUT, usecaseSpy, user } = makeSUT()

//     await SUT.handle({ context: { userId: user.id } })

//     expect(usecaseSpy).toHaveBeenCalledWith({ userId: user.id })
//   })

//   it('should return 200 on success', async () => {
//     const { SUT, user } = makeSUT()

//     const response = await SUT.handle({ context: { userId: user.id } })

//     expect(response.statusCode).toBe(200)
//     expect(response.body).toMatchObject({
//       user: {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         type: user.type,
//         createdAt: user.createdAt,
//         updatedAt: user.updatedAt,
//       },
//     })
//   })

//   it('should return 403 if missing userId', async () => {
//     const error = new MissingParamsError()

//     const { SUT } = makeSUT()

//     const response = await SUT.handle({})

//     expect(response.statusCode).toBe(403)
//     expect(response.body).toMatchObject({
//       code: error.code,
//       message: error.message,
//     })
//   })

//   it('should return 404 if user does not exist', async () => {
//     const error = new AuthenticateUserError.UserDoesNotExistError()

//     const { SUT, usecaseSpy, user } = makeSUT()
//     usecaseSpy.mockResolvedValueOnce(left(error))

//     const response = await SUT.handle({ context: { userId: user.id } })

//     expect(response.statusCode).toBe(404)
//     expect(response.body).toMatchObject({
//       code: error.code,
//       message: error.message,
//     })
//   })
// })
