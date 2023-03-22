import { Either, left, right } from '@shared/utils'

import { UserDoesNotExistError } from '@/domain/errors'
import { BaseError } from '@/domain/helpers'
import { IUpdateUserPictureUseCase } from '@/domain/usecases'

import { IStorageService, IUserRepository } from '@/data/contracts'

export class UpdateUserPictureUseCase implements IUpdateUserPictureUseCase {
  constructor(
    private readonly findOneUserRepository: IUserRepository.FindOne,
    private readonly saveStorageService: IStorageService.Save,
  ) {}

  async update(
    { userId }: IUpdateUserPictureUseCase.Params,
    { file }: IUpdateUserPictureUseCase.Body,
  ): Promise<Either<BaseError, IUpdateUserPictureUseCase.Output>> {
    const user = await this.findOneUserRepository.findOne({ id: userId })

    if (!user) {
      return left(new UserDoesNotExistError())
    }

    const userPicturePath = `users/${userId}`

    const uploadFileResponse = await this.saveStorageService.save({
      path: userPicturePath,
      file: {
        originalName: file.originalName,
        buffer: file.buffer,
        destinationName: 'profile-picture',
      },
    })

    if (uploadFileResponse.isLeft()) return uploadFileResponse

    return right({ url: uploadFileResponse.value.url })
  }
}
