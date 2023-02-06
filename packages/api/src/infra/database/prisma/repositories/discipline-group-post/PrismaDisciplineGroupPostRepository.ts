import { IDisciplineGroupPost } from '@shared/entities'
import { IDisciplineGroupPostRepository } from '@/data/contracts'
import { PrismaRepository } from '@/infra/database/prisma/helpers'

import { DisciplineGroupPost } from '@prisma/client'

export class PrismaDisciplineGroupPostRepository
  extends PrismaRepository
  implements
    IDisciplineGroupPostRepository.Create,
    IDisciplineGroupPostRepository.Count,
    IDisciplineGroupPostRepository.FindAll,
    IDisciplineGroupPostRepository.FindOne,
    IDisciplineGroupPostRepository.Delete
{
  async create({
    title,
    content,
    authorId,
    disciplineGroupId,
  }: IDisciplineGroupPostRepository.Create.Input): Promise<IDisciplineGroupPostRepository.Create.Output> {
    const disciplineGroupPost = await this.client.disciplineGroupPost.create({
      data: {
        title,
        content,
        authorId,
        disciplineGroupId,
      },
    })

    return this.parseDisciplineGroupPost(disciplineGroupPost)
  }

  async count(
    input: IDisciplineGroupPostRepository.Count.Input = {},
  ): Promise<IDisciplineGroupPostRepository.Count.Output> {
    const { where } = input

    return await this.client.disciplineGroupPost.count({ where })
  }

  async findAll(
    input: IDisciplineGroupPostRepository.FindAll.Input,
  ): Promise<IDisciplineGroupPostRepository.FindAll.Output> {
    const { take = 10, skip = 0, where, include, orderBy } = input

    const disciplineGroupPosts = await this.client.disciplineGroupPost.findMany(
      {
        take,
        skip: skip * take,
        where,
        include,
        orderBy,
      },
    )

    return disciplineGroupPosts.map(this.parseDisciplineGroupPost)
  }

  async findOne({
    where,
  }: IDisciplineGroupPostRepository.FindOne.Input): Promise<IDisciplineGroupPost> {
    const { id } = where

    const disciplineGroupPost = await this.client.disciplineGroupPost.findFirst(
      {
        where: { id },
      },
    )

    if (!disciplineGroupPost) return null

    return this.parseDisciplineGroupPost(disciplineGroupPost)
  }

  async delete({
    where,
  }: IDisciplineGroupPostRepository.Delete.Input): Promise<void> {
    const { id } = where

    await this.client.disciplineGroupPost.delete({
      where: { id },
    })
  }

  private parseDisciplineGroupPost(
    disciplineGroupPost: DisciplineGroupPost,
  ): IDisciplineGroupPost {
    return {
      ...disciplineGroupPost,
      title: disciplineGroupPost.title ?? undefined,
      authorId: disciplineGroupPost.authorId ?? undefined,
      disciplineGroupId: disciplineGroupPost.disciplineGroupId ?? undefined,
    }
  }
}
