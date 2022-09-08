import { IUserRepository } from '@/data/contracts'
import { PrismaUserRepository } from '@/infra/database/prisma/repositories'

type IUserRepository = IUserRepository.Create &
  IUserRepository.FindOne &
  IUserRepository.Update

export const makeUserRepository = (): IUserRepository => {
  return new PrismaUserRepository()
}
