import { ILastMessageDTO } from '@shared/dtos'
import { Either, left, right } from '@shared/utils'

import { StudentDoesNotExistError } from '@/domain/errors'
import { IReadLastMessagesUseCase } from '@/domain/usecases'
import { BaseError } from '@/domain/helpers'

import {
  ICountDisciplineGroupRepository,
  IFindAllDisciplineGroupMessageRepository,
  IFindAllDisciplineGroupRepository,
  IFindOneStudentRepository,
} from '@/data/contracts'

export class ReadLastMessagesUseCase implements IReadLastMessagesUseCase {
  constructor(
    private readonly findOneStudentRepository: IFindOneStudentRepository,
    private readonly findAllDisciplineGroupRepository: IFindAllDisciplineGroupRepository,
    private readonly countDisciplineGroupRepository: ICountDisciplineGroupRepository,
    private readonly findAllDisciplineGroupMessageRepository: IFindAllDisciplineGroupMessageRepository,
  ) {}

  async run({
    userId,
    listInput,
  }: IReadLastMessagesUseCase.Input): Promise<
    Either<BaseError, IReadLastMessagesUseCase.Output>
  > {
    const { paginate } = listInput

    const student = await this.findOneStudentRepository.findOne({ userId })

    if (!student) {
      return left(new StudentDoesNotExistError())
    }

    const [disciplineGroups, total] = await Promise.all([
      this.findAllDisciplineGroupRepository.findAll({
        skip: paginate?.page,
        take: paginate?.limit,
        where: { studentIds: { has: student.id } },
        include: { discipline: true },
        orderBy: { discipline: { code: 'desc' } },
      }),
      this.countDisciplineGroupRepository.count({
        where: { studentIds: { has: student.id } },
      }),
    ])

    const promises = disciplineGroups.map(async disciplineGroup => {
      return this.findAllDisciplineGroupMessageRepository
        .findAll({
          where: { disciplineGroupId: disciplineGroup.id },
          take: 1,
          orderBy: { sentAt: 'desc' },
        })
        .then((messages) => {
          return <ILastMessageDTO>{
            disciplineGroupId: disciplineGroup.id,
            disciplineCode: disciplineGroup.discipline!.code,
            disciplineGroupCode: disciplineGroup.code,
            disciplineName: disciplineGroup.discipline!.name,
            message: messages[0]?.body,
            sentBy: messages[0]?.sentBy,
            sentAt: messages[0]?.sentAt,
          }
        })
    })

    const lastMessages = await Promise.all(promises)

    return right({
      results: lastMessages,
      total,
    })
  }
}
