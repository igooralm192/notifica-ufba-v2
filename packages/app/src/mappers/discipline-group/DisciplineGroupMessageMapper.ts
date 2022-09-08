import { IDisciplineGroupMessage } from '@shared/entities'

import { DocumentData } from 'firebase/firestore'

export class DisciplineGroupMessageMapper {
  static toEntity(data: DocumentData): IDisciplineGroupMessage {
    return {
      id: data.id,
      body: data.body,
      sentBy: data.sentBy,
      sentById: data.sentById,
      disciplineGroupId: data.disciplineGroupId,
      sentAt: data.sentAt.toDate(),
    }
  }

  static toEntityList(data: DocumentData[]): IDisciplineGroupMessage[] {
    return data.map((item: DocumentData) =>
      DisciplineGroupMessageMapper.toEntity(item),
    )
  }
}
