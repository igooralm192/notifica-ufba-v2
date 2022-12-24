import { IStudent } from '@shared/entities'
import { Either, UseCase } from '@shared/utils'
import { BaseError } from '@/domain/helpers'
import { IUpdateUserUseCase } from '@/domain/usecases'

export namespace IUpdateStudentUseCase {
  export type Input = {
    where: {
      id?: string
      userId?: string
    }
    data: {
      matriculation?: string
      course?: string
      user?: IUpdateUserUseCase.Input['data']
    }
  }

  export type Output = {
    student: IStudent
  }
}

export type IUpdateStudentUseCase = UseCase<
  IUpdateStudentUseCase.Input,
  Either<BaseError, IUpdateStudentUseCase.Output>
>
