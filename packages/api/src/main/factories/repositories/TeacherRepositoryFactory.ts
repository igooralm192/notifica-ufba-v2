import {
  ITeacherRepository
} from '@/data/contracts'
import { PrismaTeacherRepository } from '@/infra/database/prisma/repositories'

type ITeacherRepository = ITeacherRepository.FindOne

export const makeTeacherRepository = (): ITeacherRepository => {
  return new PrismaTeacherRepository()
}
