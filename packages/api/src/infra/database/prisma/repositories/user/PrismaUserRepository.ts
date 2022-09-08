import { IUser } from '@shared/entities'
import { IUserRepository } from '@/data/contracts'
import { PrismaRepository } from '@/infra/database/prisma/helpers'

import { User } from '@prisma/client'

export class PrismaUserRepository
  extends PrismaRepository
  implements
    IUserRepository.Create,
    IUserRepository.FindOne,
    IUserRepository.Update
{
  async create(
    input: IUserRepository.Create.Input,
  ): Promise<IUserRepository.Create.Output> {
    const user = await this.client.user.create({
      data: input,
      include: {
        student: true,
        teacher: true,
      },
    })

    return this.parseUser(user)
  }

  async findOne(
    input: IUserRepository.FindOne.Input,
  ): Promise<IUserRepository.FindOne.Output> {
    const user = await this.client.user
      .findFirst({
        where: input,
        include: {
          student: true,
          teacher: true,
        },
      })
      .catch(() => null)

    if (!user) return null

    return this.parseUser(user)
  }

  async update({
    where,
    data,
  }: IUserRepository.Update.Input): Promise<IUserRepository.Update.Output> {
    const user = await this.client.user.update({
      where,
      data,
      include: { teacher: true, student: true },
    })

    return this.parseUser(user)
  }

  private parseUser(user: User): IUser {
    return {
      ...user,
      pushToken: user.pushToken || undefined,
    }
  }
}
