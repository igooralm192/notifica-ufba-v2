import { UserAlreadyExistsError } from '@/domain/errors'
import { ICreateUserUseCase } from '@/domain/usecases'
import { BaseError } from '@/domain/helpers'
import { Either, left, right } from '@shared/utils'

import {
  IGenerateHashCryptography,
  IUserRepository
} from '@/data/contracts'

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    private readonly findOneUserRepository: IUserRepository.FindOne,
    private readonly generateHashCryptography: IGenerateHashCryptography,
    private readonly createUserRepository: IUserRepository.Create,
  ) {}

  async run({
    name,
    email,
    password,
    type = 'STUDENT',
  }: ICreateUserUseCase.Input): Promise<
    Either<BaseError, ICreateUserUseCase.Output>
  > {
    const user = await this.findOneUserRepository.findOne({ email })

    if (user) return left(new UserAlreadyExistsError())

    const hashedPassword = await this.generateHashCryptography.generate({
      payload: password,
    })

    const createdUser = await this.createUserRepository.create({
      name,
      email,
      password: hashedPassword,
      type,
    })

    return right({ user: createdUser })
  }
}
