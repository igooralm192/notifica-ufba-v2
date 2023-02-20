import { Either, left, right } from '@shared/utils'

import { UserDoesNotExistError } from '@/domain/errors'
import { BaseError } from '@/domain/helpers'
import {
  IGetUserByIdUseCase,
  IReadUserPictureUrlUseCase,
} from '@/domain/usecases'

import { IUserRepository } from '@/data/contracts'


export class GetUserByIdUseCase implements IGetUserByIdUseCase {
  constructor(
    private readonly findOneUserRepository: IUserRepository.FindOne,
    private readonly readUserPictureUrlUseCase: IReadUserPictureUrlUseCase,
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

    // const readPictureUrlResult =
    //   await this.readUserPictureUrlUseCase.readPictureUrl({ userId })

    // if (readPictureUrlResult.isLeft()) {
    //   return left(readPictureUrlResult.value)
    // }

    // const { url: profilePictureUrl } = readPictureUrlResult.value

    return right({
      user,
    })
  }
}
