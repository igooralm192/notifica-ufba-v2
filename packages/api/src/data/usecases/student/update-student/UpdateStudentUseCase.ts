import { Either, left, right } from '@shared/utils'
import { StudentDoesNotExistError } from '@/domain/errors'
import { BaseError } from '@/domain/helpers'
import { IUpdateStudentUseCase, IUpdateUserUseCase } from '@/domain/usecases'

import {
  IFindOneStudentRepository,
  IUpdateStudentRepository,
} from '@/data/contracts'

export class UpdateStudentUseCase implements IUpdateStudentUseCase {
  constructor(
    private readonly findOneStudentRepository: IFindOneStudentRepository,
    private readonly updateStudentRepository: IUpdateStudentRepository,
    private readonly updateUserUseCase: IUpdateUserUseCase,
  ) {}

  async run({
    where,
    data,
  }: IUpdateStudentUseCase.Input): Promise<
    Either<BaseError, IUpdateStudentUseCase.Output>
  > {
    const { id, userId } = where
    const { matriculation, course, user } = data

    const student = await this.findOneStudentRepository.findOne({ id, userId })

    if (!student) {
      return left(new StudentDoesNotExistError())
    }

    await this.updateUserUseCase.run({
      id: { userId: student.userId },
      data: user,
    })

    const updatedStudent = await this.updateStudentRepository.update({
      where: { id, userId },
      data: { matriculation, course },
    })

    return right({ student: updatedStudent })
  }
}
