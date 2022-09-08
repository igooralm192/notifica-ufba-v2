import { PrismaDBClient } from '@/infra/database/prisma/helpers'

export class PrismaRepository {
  constructor(
    protected readonly client = PrismaDBClient.getInstance().client,
  ) {}
}
