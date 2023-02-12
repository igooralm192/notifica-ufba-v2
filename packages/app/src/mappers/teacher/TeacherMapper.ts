import { ITeacher } from '@shared/entities'
import { UserMapper } from '../user/UserMapper'

export class TeacherMapper {
  static toEntity(data: Record<string, any>): ITeacher {
    return {
      id: data.id,
      userId: data.userId,
      user: data.user ? UserMapper.toEntity(data.user) : undefined,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    }
  }
}
