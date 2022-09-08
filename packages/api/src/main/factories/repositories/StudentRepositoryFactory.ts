import {
  ICreateStudentRepository,
  IFindAllStudentRepository,
  IFindOneStudentRepository,
} from '@/data/contracts'
import { PrismaStudentRepository } from '@/infra/database/prisma/repositories'

type IStudentRepository = ICreateStudentRepository &
  IFindAllStudentRepository &
  IFindOneStudentRepository

export const makeStudentRepository = (): IStudentRepository => {
  return new PrismaStudentRepository()
}
