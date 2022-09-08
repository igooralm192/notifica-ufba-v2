import { IDisciplineGroupPost } from '@shared/entities'
import { IDisciplineGroupPostRepository } from '@/data/contracts'
import { PrismaRepository } from '@/infra/database/prisma/helpers'

import { DisciplineGroupPost } from '@prisma/client'

export class PrismaDisciplineGroupPostRepository
  extends PrismaRepository
  implements
    IDisciplineGroupPostRepository.Create,
    IDisciplineGroupPostRepository.FindAllByDisciplineGroupId
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

  async findAllByDisciplineGroupId(
    disciplineGroupId: string,
    listInput: IDisciplineGroupPostRepository.FindAllByDisciplineGroupId.Input,
  ): Promise<IDisciplineGroupPostRepository.FindAllByDisciplineGroupId.Output> {
    const { take, skip, where, include, orderBy } = listInput

    const disciplineGroupPosts = await this.client.disciplineGroupPost.findMany(
      {
        take,
        skip,
        where: { ...where, disciplineGroupId },
        include,
        orderBy,
      },
    )

    return {
      results: disciplineGroupPosts.map(this.parseDisciplineGroupPost),
      total: disciplineGroupPosts.length,
    }
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
