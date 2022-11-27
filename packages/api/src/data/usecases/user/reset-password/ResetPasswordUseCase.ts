import { Either, left, right } from '@shared/utils'
import { UserDoesNotExistError } from '@/domain/errors'
import { IResetPasswordUseCase } from '@/domain/usecases'
import { BaseError } from '@/domain/helpers'

import {
  IDecodeTokenCryptography,
  IGenerateHashCryptography,
  IUserRepository,
} from '@/data/contracts'

export class ResetPasswordUseCase implements IResetPasswordUseCase {
  constructor(
    private readonly decodeTokenCryptography: IDecodeTokenCryptography,
    private readonly findOneUserRepository: IUserRepository.FindOne,
    private readonly generateHashCryptography: IGenerateHashCryptography,
    private readonly updateUserRepository: IUserRepository.Update,
  ) {}

  async resetPassword({
    newPassword,
    token,
  }: IResetPasswordUseCase.Body): Promise<Either<BaseError, void>> {
    const decodeResponse = await this.decodeTokenCryptography.decode<{
      userId: string
    }>({ token })

    if (decodeResponse.isLeft()) return left(decodeResponse.value)

    const { userId } = decodeResponse.right()

    const user = await this.findOneUserRepository.findOne({ id: userId })

    if (!user) {
      return left(new UserDoesNotExistError())
    }

    const hashPassword = await this.generateHashCryptography.generate({
      payload: newPassword,
    })

    await this.updateUserRepository.update({
      data: { password: hashPassword },
      where: { id: userId },
    })

    return right(undefined)
  }
}
