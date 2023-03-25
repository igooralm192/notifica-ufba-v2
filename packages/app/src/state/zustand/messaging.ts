import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

export interface IMessagingStore {
  removeMemberMessage?: { disciplineGroupId: string }
}

const messagingStore = create(subscribeWithSelector<IMessagingStore>(() => ({})))

export const getMessagingStore = () => messagingStore

export const useMessagingStore = () => messagingStore(state => state)
