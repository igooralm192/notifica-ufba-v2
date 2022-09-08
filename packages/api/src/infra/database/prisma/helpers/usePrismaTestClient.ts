import { PrismaDBClient } from '@/infra/database/prisma/helpers'
import { PrismaClient } from '@prisma/client'

export const usePrismaTestClient = (beforeAllCb?: () => Promise<void>) => {
  let client: PrismaClient

  beforeAll(async () => {
    await PrismaDBClient.getInstance().connect()

    client = PrismaDBClient.getInstance().client

    beforeAllCb?.()
  })

  afterAll(async () => {
    await client.$disconnect()
  })

  return () => client
}
