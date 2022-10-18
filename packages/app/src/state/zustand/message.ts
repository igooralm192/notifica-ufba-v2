import { IDisciplineGroupMessage } from '@shared/entities'
import create from 'zustand'

export interface IMessageStore {
  lastMessage?: IDisciplineGroupMessage
}

const messageStore = create<IMessageStore>(() => ({}))

export const getMessageStore = () => messageStore

export const useMessageStore = () => messageStore(state => state)
