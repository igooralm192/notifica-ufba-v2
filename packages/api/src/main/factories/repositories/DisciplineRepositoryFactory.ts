import {
  ICountDisciplineRepository,
  IFindAllDisciplineRepository,
} from '@/data/contracts'
import { PrismaDisciplineRepository } from '@/infra/database/prisma/repositories'

type IDisciplineRepository = ICountDisciplineRepository &
  IFindAllDisciplineRepository

export const makeDisciplineRepository = (): IDisciplineRepository => {
  return new PrismaDisciplineRepository()
}
