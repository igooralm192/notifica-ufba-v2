import {
  ICreateStudentRepository,
  IFindAllStudentRepository,
  IFindOneStudentRepository,
  IUpdateStudentRepository,
} from '@/data/contracts'
import { PrismaRepository } from '@/infra/database/prisma/helpers'

export class PrismaStudentRepository
  extends PrismaRepository
  implements
    ICreateStudentRepository,
    IFindAllStudentRepository,
  IFindOneStudentRepository,
    IUpdateStudentRepository
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

    return students.map(student => ({
      ...student,
      user: student.user || undefined,
    }))
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

  async update({
    where,
    data,
  }: IUpdateStudentRepository.Input): Promise<IUpdateStudentRepository.Output> {
    const student = await this.client.student.update({
      where,
      data,
      include: { user: true },
    })

    return {
      ...student,
      user: student.user || undefined,
    }
  }
}
