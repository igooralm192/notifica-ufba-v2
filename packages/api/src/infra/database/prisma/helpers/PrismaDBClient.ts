import { IDBClient } from '@/application/protocols'

import { PrismaClient } from '@prisma/client'

export class PrismaDBClient implements IDBClient<PrismaClient> {
  private static instance?: PrismaDBClient

  private _client = new PrismaClient()

  static getInstance(): PrismaDBClient {
    if (!PrismaDBClient.instance) PrismaDBClient.instance = new PrismaDBClient()

    return PrismaDBClient.instance
  }

  get client(): PrismaClient {
    return this._client
  }

  async connect(): Promise<void> {
    await this.client.$connect()
  }

  async disconnect(): Promise<void> {
    await this.client.$disconnect()
  }
}
