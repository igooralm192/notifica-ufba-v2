import { IStudent } from '@shared/entities'
import { BaseError } from '@/domain/helpers'
import { Either, UseCase } from '@shared/utils'

export namespace ICreateStudentUseCase {
  export type Input = {
    name: string
    email: string
    password: string
    matriculation: string
    course: string
  }

  export type Output = {
    student: IStudent
  }
}

export type ICreateStudentUseCase = UseCase<
  ICreateStudentUseCase.Input,
  Either<BaseError, ICreateStudentUseCase.Output>
>
