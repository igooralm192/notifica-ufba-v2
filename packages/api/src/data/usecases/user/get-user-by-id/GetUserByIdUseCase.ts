import { Either, left, right } from '@shared/utils'

import { UserDoesNotExistError } from '@/domain/errors'
import { BaseError } from '@/domain/helpers'
import { IGetUserByIdUseCase } from '@/domain/usecases'

import { IStorageService, IUserRepository } from '@/data/contracts'


export class GetUserByIdUseCase implements IGetUserByIdUseCase {
  constructor(
    private readonly findOneUserRepository: IUserRepository.FindOne,
    private readonly getFileUrlStorageService: IStorageService.GetFileUrl,
  ) {}

  async run({
    userId,
  }: IGetUserByIdUseCase.Input): Promise<
    Either<BaseError, IGetUserByIdUseCase.Output>
  > {
    const user = await this.findOneUserRepository.findOne({ id: userId })

    if (!user) {
      return left(new UserDoesNotExistError())
    }

    const { url: profilePictureUrl } =
      await this.getFileUrlStorageService.getFileUrl({
        path: `users/${user.id}`,
        filename: 'profile-picture',
      })

    return right({ user: { ...user, profilePictureUrl } })
  }
}
