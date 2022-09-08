import { ILastMessageDTO } from '@notifica-ufba/domain/usecases'
import { EntityState } from '@reduxjs/toolkit'

export interface ILastMessagesStore {
  data: EntityState<ILastMessageDTO>
  total: number
}
