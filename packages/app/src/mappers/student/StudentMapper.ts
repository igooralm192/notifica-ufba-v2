import { IStudent } from '@shared/entities'

import { UserMapper } from '../user/UserMapper'

export class StudentMapper {
  static toEntity(data: Record<string, any>): IStudent {
    return {
      id: data.id,
      matriculation: data.matriculation,
      course: data.course,
      userId: data.userId,
      user: data.user ? UserMapper.toEntity(data.user) : undefined,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    }
  }
}
