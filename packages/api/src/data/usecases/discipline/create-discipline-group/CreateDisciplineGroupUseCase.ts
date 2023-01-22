import { Either, left, right } from '@shared/utils'

import {
  DisciplineGroupDoesNotExistError,
  PermissionDeniedError,
  UserDoesNotExistError,
} from '@/domain/errors'
import { ICreateDisciplineGroupUseCase } from '@/domain/usecases'
import { BaseError } from '@/domain/helpers'

import {
  IUserRepository,
  IFindOneDisciplineRepository,
  ICreateDisciplineGroupRepository,
} from '@/data/contracts'

export class CreateDisciplineGroupUseCase
  implements ICreateDisciplineGroupUseCase
{
  constructor(
    private readonly findOneUserRepository: IUserRepository.FindOne,
    private readonly findOneDisciplineRepository: IFindOneDisciplineRepository,
    private readonly createDisciplineGroupRepository: ICreateDisciplineGroupRepository,
  ) {}

  async create(
    { disciplineId, userId }: ICreateDisciplineGroupUseCase.Params,
    body: ICreateDisciplineGroupUseCase.Body,
  ): Promise<Either<BaseError, ICreateDisciplineGroupUseCase.Output>> {
    const user = await this.findOneUserRepository.findOne({ id: userId })

    if (!user) {
      return left(new UserDoesNotExistError())
    }

    if (user.type !== 'TEACHER') return left(new PermissionDeniedError())

    const discipline = await this.findOneDisciplineRepository.findOne({
      where: { id: disciplineId },
    })

    if (!discipline) {
      return left(new DisciplineGroupDoesNotExistError())
    }

    const disciplineGroup = await this.createDisciplineGroupRepository.create(
      { disciplineId: discipline.id, teacherId: user.teacher.id },
      body,
    )

    return right(disciplineGroup)
  }
}
