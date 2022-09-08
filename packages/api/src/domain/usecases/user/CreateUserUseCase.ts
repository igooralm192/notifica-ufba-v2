import { IUser } from '@shared/entities'
import { BaseError } from '@/domain/helpers'
import { Either, UseCase } from '@shared/utils'

export namespace ICreateUserUseCase {
  export type Input = {
    name: string
    email: string
    password: string
    type?: 'STUDENT' | 'TEACHER'
  }

  export type Output = {
    user: IUser
  }
}

export type ICreateUserUseCase = UseCase<
  ICreateUserUseCase.Input,
  Either<BaseError, ICreateUserUseCase.Output>
>
