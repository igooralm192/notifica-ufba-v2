import { DisciplineGroupMapper } from '@/mappers'
import { IDiscipline } from '@shared/entities'

export class DisciplineMapper {
  static toEntity(data: Record<string, any>): IDiscipline {
    return {
      id: data.id,
      name: data.name,
      code: data.code,
      course: data.course,
      groups: data.groups
        ? DisciplineGroupMapper.toEntityList(data.groups)
        : undefined,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    }
  }

  static toEntityList(data: Record<string, any>[]): IDiscipline[] {
    return data.map(DisciplineMapper.toEntity)
  }
}
