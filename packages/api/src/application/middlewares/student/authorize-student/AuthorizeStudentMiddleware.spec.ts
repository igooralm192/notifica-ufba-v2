// import { MockedGetUserIdByTokenUseCase } from '@/domain/mocks'
// import { right } from '@shared/utils'

// import faker from 'faker'

// import { AuthorizeUserMiddleware } from '.'

// const makeSUT = () => {
//   const userId = faker.datatype.uuid()

//   const getUserIdByTokenUseCase = new MockedGetUserIdByTokenUseCase()
//   const authorizeUserMiddleware = new AuthorizeUserMiddleware(
//     getUserIdByTokenUseCase,
//   )

//   const getUserIdByTokenUseCaseSpy = jest.spyOn(getUserIdByTokenUseCase, 'run')
//   getUserIdByTokenUseCaseSpy.mockResolvedValue(right({ userId }))

//   return {
//     SUT: authorizeUserMiddleware,
//     getUserIdByTokenUseCaseSpy,
//     userId,
//   }
// }

// describe('AuthorizeUserMiddleware', () => {
//   it('should call getUserIdByToken usecase correctly', async () => {
//     const { SUT, getUserIdByTokenUseCaseSpy } = makeSUT()

//     await SUT.handle({
//       headers: {
//         authorization: 'Bearer any-token',
//       },
//     })

//     expect(getUserIdByTokenUseCaseSpy).toHaveBeenCalledWith({
//       token: 'any-token',
//     })
//   })

//   it('should authorize a user returning your userId on status 200', async () => {
//     const { SUT, userId } = makeSUT()

//     const response = await SUT.handle({
//       headers: {
//         authorization: 'Bearer any-token',
//       },
//     })

//     expect(response.statusCode).toBe(200)
//     expect(response.body).toMatchObject({ userId })
//   })
// })
