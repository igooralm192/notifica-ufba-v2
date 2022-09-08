import { IDisciplineGroupPost } from '@shared/entities'
import { DisciplineGroupMapper } from '../discipline-group/DisciplineGroupMapper'
import { UserMapper } from '../user/UserMapper'

export class DisciplineGroupPostMapper {
  static toEntity(data: Record<string, any>): IDisciplineGroupPost {
    return {
      id: data.id,
      title: data.title,
      content: data.content,

      authorId: data.authorId,
      disciplineGroupId: data.disciplineGroupId,

      author: data.author ? UserMapper.toEntity(data.author) : undefined,
      disciplineGroup: data.disciplineGroup
        ? DisciplineGroupMapper.toEntity(data.disciplineGroup)
        : undefined,

      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    }
  }

  static toEntityList(data: Record<string, any>[]): IDisciplineGroupPost[] {
    return data.map((item: Record<string, any>) =>
      DisciplineGroupPostMapper.toEntity(item),
    )
  }
}
