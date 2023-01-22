import {
  ICountDisciplineRepository,
  IFindAllDisciplineRepository,
  IFindOneDisciplineRepository,
} from '@/data/contracts'
import { PrismaDisciplineRepository } from '@/infra/database/prisma/repositories'

type IDisciplineRepository = ICountDisciplineRepository &
  IFindAllDisciplineRepository &
  IFindOneDisciplineRepository

export const makeDisciplineRepository = (): IDisciplineRepository => {
  return new PrismaDisciplineRepository()
}
