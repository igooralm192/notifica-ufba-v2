import { Either, left, right } from '@shared/utils'
import { UserDoesNotExistError } from '@/domain/errors'
import { BaseError } from '@/domain/helpers'
import { IUpdateUserUseCase } from '@/domain/usecases'

import { IUserRepository } from '@/data/contracts'

export class UpdateUserUseCase implements IUpdateUserUseCase {
  constructor(
    private readonly findOneUserRepository: IUserRepository.FindOne,
    private readonly updateUserRepository: IUserRepository.Update,
  ) {}

  async run({
    id,
    data,
  }: IUpdateUserUseCase.Input): Promise<
    Either<BaseError, IUpdateUserUseCase.Output>
  > {
    const user = await this.findOneUserRepository.findOne({ id: id.userId })

    if (!user) {
      return left(new UserDoesNotExistError())
    }

    const updatedUser = await this.updateUserRepository.update({
      where: { id: id.userId },
      data,
    })

    return right({ user: updatedUser })
  }
}
