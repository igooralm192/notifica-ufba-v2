import {
  ICountDisciplineGroupRepository,
  IFindAllDisciplineGroupRepository,
  IFindOneDisciplineGroupRepository,
  IPushStudentDisciplineGroupRepository,
  IRemoveStudentDisciplineGroupRepository,
} from '@/data/contracts'
import { PrismaDisciplineGroupRepository } from '@/infra/database/prisma/repositories/discipline-group'

type IDisciplineGroupRepository = ICountDisciplineGroupRepository &
  IFindAllDisciplineGroupRepository &
  IFindOneDisciplineGroupRepository &
  IPushStudentDisciplineGroupRepository &
  IRemoveStudentDisciplineGroupRepository

export const makeDisciplineGroupRepository = (): IDisciplineGroupRepository => {
  return new PrismaDisciplineGroupRepository()
}
