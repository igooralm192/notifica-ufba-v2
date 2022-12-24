import {
  ICreateStudentRepository,
  IFindAllStudentRepository,
  IFindOneStudentRepository,
  IUpdateStudentRepository,
} from '@/data/contracts'
import { PrismaStudentRepository } from '@/infra/database/prisma/repositories'

type IStudentRepository = ICreateStudentRepository &
  IFindAllStudentRepository &
  IFindOneStudentRepository & IUpdateStudentRepository

export const makeStudentRepository = (): IStudentRepository => {
  return new PrismaStudentRepository()
}
