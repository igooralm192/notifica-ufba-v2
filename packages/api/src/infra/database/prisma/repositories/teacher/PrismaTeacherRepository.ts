import { ITeacherRepository } from '@/data/contracts'
import { PrismaRepository } from '@/infra/database/prisma/helpers'

export class PrismaTeacherRepository
  extends PrismaRepository
  implements ITeacherRepository.FindOne
{
  async findOne({
    where,
  }: ITeacherRepository.FindOne.Input): Promise<ITeacherRepository.FindOne.Output> {
    const teacher = await this.client.teacher
      .findFirst({
        where,
        include: { user: true },
      })
      .catch(() => null)

    if (!teacher) return null

    return {
      ...teacher,
      user: teacher.user
        ? {
            ...teacher.user,
            pushToken: teacher.user.pushToken || undefined,
          }
        : undefined,
    }
  }
}
