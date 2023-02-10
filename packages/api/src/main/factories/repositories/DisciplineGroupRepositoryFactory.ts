import {
  ICountDisciplineGroupRepository,
  ICreateDisciplineGroupRepository,
  IDeleteDisciplineGroupRepository,
  IFindAllDisciplineGroupRepository,
  IFindAllDisciplineGroupStudentsRepository,
  IFindAllDisciplineGroupTeachersRepository,
  IFindOneDisciplineGroupRepository,
  IPushStudentDisciplineGroupRepository,
  IRemoveStudentDisciplineGroupRepository,
} from '@/data/contracts'
import { PrismaDisciplineGroupRepository } from '@/infra/database/prisma/repositories/discipline-group'

type IDisciplineGroupRepository = ICountDisciplineGroupRepository &
  IFindAllDisciplineGroupRepository &
  IFindOneDisciplineGroupRepository &
  IPushStudentDisciplineGroupRepository &
  IRemoveStudentDisciplineGroupRepository &
  ICreateDisciplineGroupRepository &
  IDeleteDisciplineGroupRepository &
  IFindAllDisciplineGroupStudentsRepository &
  IFindAllDisciplineGroupTeachersRepository

export const makeDisciplineGroupRepository = (): IDisciplineGroupRepository => {
  return new PrismaDisciplineGroupRepository()
}
