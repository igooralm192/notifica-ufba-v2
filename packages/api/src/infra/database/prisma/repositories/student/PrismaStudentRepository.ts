import {
  ICreateStudentRepository,
  IFindAllStudentRepository,
  IFindOneStudentRepository,
} from '@/data/contracts'
import { PrismaRepository } from '@/infra/database/prisma/helpers'

export class PrismaStudentRepository
  extends PrismaRepository
  implements
    ICreateStudentRepository,
    IFindAllStudentRepository,
    IFindOneStudentRepository
{
  async create({
    matriculation,
    course,
    userId,
  }: ICreateStudentRepository.Input): Promise<ICreateStudentRepository.Output> {
    const student = await this.client.student.create({
      data: {
        matriculation,
        course,
        userId,
      },
      include: { user: true },
    })

    return {
      ...student,
      user: student.user || undefined,
    }
  }

  async findAll({
    take,
    skip,
    where,
    include,
  }: IFindAllStudentRepository.Input): Promise<IFindAllStudentRepository.Output> {
    const students = await this.client.student.findMany({
      take,
      skip,
      where,
      include,
    })

    return {
      results: students.map(student => ({
        ...student,
        user: student.user || undefined,
      })),
      total: students.length,
    }
  }

  async findOne(
    input: IFindOneStudentRepository.Input,
  ): Promise<IFindOneStudentRepository.Output> {
    const student = await this.client.student
      .findFirst({
        where: input,
        include: { user: true },
      })
      .catch(() => null)

    if (!student) return null

    return {
      ...student,
      user: student.user || undefined,
    }
  }
}
