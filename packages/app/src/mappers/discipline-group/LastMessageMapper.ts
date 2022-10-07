import { ILastMessageDTO } from '@shared/dtos'

export class LastMessageMapper {
  static toDTO(data: Record<string, any>): ILastMessageDTO {
    return {
      disciplineGroupId: data.disciplineGroupId,
      disciplineCode: data.disciplineCode,
      disciplineGroupCode: data.disciplineGroupCode,
      disciplineName: data.disciplineName,
      message: data.message,
      sentBy: data.sentBy,
      sentAt: data.sentAt ? new Date(data.sentAt) : undefined,
    }
  }

  static toDTOList(data: Record<string, any>[]): ILastMessageDTO[] {
    return data.map(LastMessageMapper.toDTO)
  }
}
