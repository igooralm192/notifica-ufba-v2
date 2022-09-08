import { IDBClient } from '@/application/protocols'
import { PrismaDBClient } from '@/infra/database/prisma/helpers'
import { PrismaClient } from '@prisma/client'

export const makeDBClient = (): IDBClient<PrismaClient> => {
  return PrismaDBClient.getInstance()
}
