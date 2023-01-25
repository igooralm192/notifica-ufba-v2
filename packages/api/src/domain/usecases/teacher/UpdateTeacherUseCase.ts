import { ITeacher } from '@shared/entities'
import { Either, UseCase } from '@shared/utils'
import { BaseError } from '@/domain/helpers'
import { IUpdateUserUseCase } from '@/domain/usecases'

export namespace IUpdateTeacherUseCase {
  export type Input = {
    where: {
      id?: string
      userId?: string
    }
    data: {
      user?: IUpdateUserUseCase.Input['data']
    }
  }

  export type Output = {
    teacher: ITeacher
  }
}

export type IUpdateTeacherUseCase = UseCase<
  IUpdateTeacherUseCase.Input,
  Either<BaseError, IUpdateTeacherUseCase.Output>
>
