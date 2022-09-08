// import { AuthenticateUserError } from '@/domain/errors'
// import { mockUser } from '@/domain/mocks'
// import { IGetUserByIdUseCase } from '@/domain/usecases'

// import { MockedUserRepository } from '@/data/mocks/repositories'

// import { GetUserByIdUseCase } from '.'

// const makeSUT = () => {
//   const user = mockUser()

//   const repository = new MockedUserRepository()
//   const usecase = new GetUserByIdUseCase(repository)

//   const findOneSpy = jest.spyOn(repository, 'findOne')
//   findOneSpy.mockResolvedValue(user)

//   return {
//     SUT: usecase,
//     findOneSpy,
//     user,
//   }
// }

// describe('GetUserByIdUseCase', () => {
//   it('Should call findOne user repository correctly', async () => {
//     const { SUT, findOneSpy, user } = makeSUT()

//     await SUT.run({ userId: user.id })

//     expect(findOneSpy).toHaveBeenCalledWith({ id: user.id })
//   })

//   it('Should be able to get user by id', async () => {
//     const { SUT, user } = makeSUT()

//     const resultOrError = await SUT.run({ userId: user.id })
//     const result = resultOrError.right()

//     expect(result).toMatchObject(<IGetUserByIdUseCase.Output>{
//       user: {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         password: user.password,
//         createdAt: user.createdAt,
//         updatedAt: user.updatedAt,
//       },
//     })
//   })

//   it('should return error if user does not exist', async () => {
//     const { SUT, findOneSpy, user } = makeSUT()

//     findOneSpy.mockResolvedValue(null)

//     const resultOrError = await SUT.run({ userId: user.id })
//     const error = resultOrError.left()

//     expect(error).toEqual(new AuthenticateUserError.UserDoesNotExistError())
//   })
// })
