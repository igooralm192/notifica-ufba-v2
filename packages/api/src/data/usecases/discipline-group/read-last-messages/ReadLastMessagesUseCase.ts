import { StudentDoesNotExistError } from '@/domain/errors'
import { ILastMessageDTO, IReadLastMessagesUseCase } from '@/domain/usecases'
import { BaseError } from '@/domain/helpers'
import { Either, left, right } from '@shared/utils'

import {
  IFindAllDisciplineGroupMessageRepository,
  IFindAllDisciplineGroupRepository,
  IFindOneStudentRepository,
} from '@/data/contracts'

export class ReadLastMessagesUseCase implements IReadLastMessagesUseCase {
  constructor(
    private readonly findOneStudentRepository: IFindOneStudentRepository,
    private readonly findAllDisciplineGroupRepository: IFindAllDisciplineGroupRepository,
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

    const disciplineGroups =
      await this.findAllDisciplineGroupRepository.findAll({
        skip: paginate?.page,
        take: paginate?.limit,
        where: { studentIds: { has: student.id } },
        include: { discipline: true },
        orderBy: { discipline: { code: 'desc' } },
      })

    const promises = disciplineGroups.results.map(async disciplineGroup => {
      return this.findAllDisciplineGroupMessageRepository
        .findAll({
          disciplineGroupId: disciplineGroup.id,
          listInput: { orderBy: { sentAt: 'desc' }, take: 1 },
        })
        .then(({ results: messages }) => {
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

    const lastMessages = await Promise.all(promises).then(lastMessages => {
      return lastMessages.filter(lastMessage => !!lastMessage.message)
    })

    return right({
      results: lastMessages,
      total: disciplineGroups.total,
    })
  }
}
