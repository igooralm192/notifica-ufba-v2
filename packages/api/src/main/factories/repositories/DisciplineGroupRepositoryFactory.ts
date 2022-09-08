import {
  IFindAllDisciplineGroupRepository,
  IFindOneDisciplineGroupRepository,
  IPushStudentDisciplineGroupRepository,
} from '@/data/contracts'
import { PrismaDisciplineGroupRepository } from '@/infra/database/prisma/repositories/discipline-group'

type IDisciplineGroupRepository = IFindAllDisciplineGroupRepository &
  IFindOneDisciplineGroupRepository &
  IPushStudentDisciplineGroupRepository

export const makeDisciplineGroupRepository = (): IDisciplineGroupRepository => {
  return new PrismaDisciplineGroupRepository()
}
