import { UserDoesNotExistError, WrongPasswordError } from '@/domain/errors'
import { IAuthenticateUserUseCase } from '@/domain/usecases'
import { BaseError } from '@/domain/helpers'
import { Either, left, right } from '@shared/utils'

import {
  ICompareHashCryptography,
  IGenerateTokenCryptography,
  IUserRepository,
} from '@/data/contracts'

export class AuthenticateUserUseCase implements IAuthenticateUserUseCase {
  constructor(
    private readonly findOneUserRepository: IUserRepository.FindOne,
    private readonly compareHashCryptography: ICompareHashCryptography,
    private readonly generateTokenCryptography: IGenerateTokenCryptography,
  ) {}

  async run({
    email,
    password,
  }: IAuthenticateUserUseCase.Input): Promise<
    Either<BaseError, IAuthenticateUserUseCase.Output>
  > {
    const user = await this.findOneUserRepository.findOne({ email })

    if (!user) {
      return left(new UserDoesNotExistError())
    }

    const passwordMatch = await this.compareHashCryptography.compare({
      payload: password,
      hashed: user.password,
    })

    if (!passwordMatch) {
      return left(new WrongPasswordError())
    }

    const token = await this.generateTokenCryptography.generate(
      { payload: { id: user.id } },
      { expiresIn: '7d' },
    )

    return right({ token, user })
  }
}
