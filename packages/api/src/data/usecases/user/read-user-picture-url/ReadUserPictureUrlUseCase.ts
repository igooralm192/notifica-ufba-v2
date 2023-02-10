import { Either, left, right } from '@shared/utils'
import { BaseError } from '@/domain/helpers'
import { IReadUserPictureUrlUseCase } from '@/domain/usecases'
import { IStorageService, IUserRepository } from '@/data/contracts'
import { UserDoesNotExistError } from '@/domain/errors'

export class ReadUserPictureUrlUseCase implements IReadUserPictureUrlUseCase {
  constructor(
    private readonly findOneUserRepository: IUserRepository.FindOne,
    private readonly getFileUrlStorageService: IStorageService.GetFileUrl,
  ) {}

  async readPictureUrl({
    userId,
  }: IReadUserPictureUrlUseCase.Params): Promise<
    Either<BaseError, IReadUserPictureUrlUseCase.Output>
  > {
    const user = await this.findOneUserRepository.findOne({ id: userId })

    if (!user) {
      return left(new UserDoesNotExistError())
    }

    const { url } = await this.getFileUrlStorageService.getFileUrl({
      path: `users/${user.id}`,
      filename: 'profile-picture',
    })

    return right({ url: url || null })
  }
}
