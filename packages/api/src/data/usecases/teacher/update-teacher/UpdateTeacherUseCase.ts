import { Either, left, right } from '@shared/utils'
import { TeacherDoesNotExistError } from '@/domain/errors'
import { BaseError } from '@/domain/helpers'
import { IUpdateTeacherUseCase, IUpdateUserUseCase } from '@/domain/usecases'

import { ITeacherRepository } from '@/data/contracts'

export class UpdateTeacherUseCase implements IUpdateTeacherUseCase {
  constructor(
    private readonly findOneTeacherRepository: ITeacherRepository.FindOne,
    private readonly updateUserUseCase: IUpdateUserUseCase,
  ) {}

  async run({
    where,
    data,
  }: IUpdateTeacherUseCase.Input): Promise<
    Either<BaseError, IUpdateTeacherUseCase.Output>
  > {
    const { id, userId } = where
    const { user } = data

    const teacher = await this.findOneTeacherRepository.findOne({
      where: { id, userId },
    })

    if (!teacher) {
      return left(new TeacherDoesNotExistError())
    }

    await this.updateUserUseCase.run({
      id: { userId: teacher.userId },
      data: user,
    })

    // TODO: Use update teacher repository

    const updatedTeacher = await this.findOneTeacherRepository.findOne({
      where: { id, userId },
    })

    return right({ teacher: updatedTeacher })
  }
}
