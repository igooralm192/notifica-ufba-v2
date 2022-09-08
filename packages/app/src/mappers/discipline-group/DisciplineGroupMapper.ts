import { DisciplineMapper } from '@/mappers/discipline/DisciplineMapper'
import { IDisciplineGroup } from '@shared/entities'
import { TeacherMapper } from '../teacher/TeacherMapper'

export class DisciplineGroupMapper {
  static toEntity(data: Record<string, any>): IDisciplineGroup {
    return {
      id: data.id,
      code: data.code,
      semester: data.semester,
      description: data.description,
      place: data.place,
      menuUrl: data.menuUrl,
      classTime: data.classTime,
      teacherId: data.teacherId,
      disciplineId: data.disciplineId,
      studentIds: data.studentIds,
      teacher: data.teacher ? TeacherMapper.toEntity(data.teacher) : undefined,
      discipline: data.discipline
        ? DisciplineMapper.toEntity(data.discipline)
        : undefined,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    }
  }

  static toEntityList(data: Record<string, any>[]): IDisciplineGroup[] {
    return data.map((item: Record<string, any>) =>
      DisciplineGroupMapper.toEntity(item),
    )
  }
}
