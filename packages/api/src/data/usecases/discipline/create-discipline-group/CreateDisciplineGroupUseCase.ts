import { Either, left, right } from '@shared/utils'

import {
  DisciplineGroupAlreadyExistsError,
  DisciplineGroupDoesNotExistError,
  UserDoesNotExistError,
} from '@/domain/errors'
import { ICreateDisciplineGroupUseCase } from '@/domain/usecases'
import { BaseError } from '@/domain/helpers'

import {
  IUserRepository,
  IFindOneDisciplineRepository,
  ICreateDisciplineGroupRepository,
  IFindOneDisciplineGroupRepository,
} from '@/data/contracts'

export class CreateDisciplineGroupUseCase
  implements ICreateDisciplineGroupUseCase
{
  constructor(
    private readonly findOneUserRepository: IUserRepository.FindOne,
    private readonly findOneDisciplineRepository: IFindOneDisciplineRepository,
    private readonly findOneDisciplineGroupRepository: IFindOneDisciplineGroupRepository,
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

    const discipline = await this.findOneDisciplineRepository.findOne({
      where: { id: disciplineId },
    })

    if (!discipline) {
      return left(new DisciplineGroupDoesNotExistError())
    }

    const findDisciplineGroup = await this.findOneDisciplineGroupRepository.findOne({
      where: { code: body.code },
    })

    if (findDisciplineGroup) {
      return left(new DisciplineGroupAlreadyExistsError())
    }

    const disciplineGroupCreated = await this.createDisciplineGroupRepository.create(
      { disciplineId: discipline.id, teacherId: user.teacher.id },
      body,
    )

    return right(disciplineGroupCreated)
  }
}
