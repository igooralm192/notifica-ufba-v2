import { IDisciplineGroupMemberDTO } from '@shared/dtos'

export class DisciplineGroupMemberMapper {
  static toDTO(data: Record<string, any>): IDisciplineGroupMemberDTO {
    return {
      userId: data.userId,
      userName: data.userName,
      userType: data.userType,
      studentId: data.studentId,
      teacherId: data.teacherId,
    }
  }

  static toDTOList(data: Record<string, any>[]): IDisciplineGroupMemberDTO[] {
    return data.map(DisciplineGroupMemberMapper.toDTO)
  }
}
