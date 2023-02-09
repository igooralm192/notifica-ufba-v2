import { StudentMapper, TeacherMapper } from '@/mappers'
import { IUser } from '@shared/entities'

export class UserMapper {
  static toEntity(data: Record<string, any>): IUser {
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      password: 'any-password',
      type: data.type,

      teacher: data.teacher ? TeacherMapper.toEntity(data.teacher) : undefined,
      student: data.student ? StudentMapper.toEntity(data.student) : undefined,

      profilePictureUrl: data.profilePictureUrl,

      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    }
  }
}
