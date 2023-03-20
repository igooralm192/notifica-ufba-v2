import {
  ICreateDisciplineGroupMessageRepository,
  IDeleteAllDisciplineGroupMessageRepository,
  IFindAllDisciplineGroupMessageRepository,
} from '@/data/contracts'
import { FirestoreDisciplineGroupMessageRepository } from '@/infra/database/firestore/repositories/discipline-group-message/FirestoreDisciplineGroupMessageRepository'

export type IDisciplineGroupMessageRepository =
  ICreateDisciplineGroupMessageRepository &
    IFindAllDisciplineGroupMessageRepository &
    IDeleteAllDisciplineGroupMessageRepository

export const makeDisciplineGroupMessageRepository =
  (): IDisciplineGroupMessageRepository => {
    return new FirestoreDisciplineGroupMessageRepository()
  }
