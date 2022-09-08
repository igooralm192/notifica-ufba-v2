import { UserDoesNotExistError } from '@/domain/errors'
import { IGetUserByIdUseCase } from '@/domain/usecases'
import { BaseError } from '@/domain/helpers'
import { Either, left, right } from '@shared/utils'

import { IUserRepository } from '@/data/contracts'

export class GetUserByIdUseCase implements IGetUserByIdUseCase {
  constructor(private readonly findOneUserRepository: IUserRepository.FindOne) {}

  async run({
    userId,
  }: IGetUserByIdUseCase.Input): Promise<
    Either<BaseError, IGetUserByIdUseCase.Output>
  > {
    const user = await this.findOneUserRepository.findOne({ id: userId })

    if (!user) {
      return left(new UserDoesNotExistError())
    }

    return right({ user })
  }
}
