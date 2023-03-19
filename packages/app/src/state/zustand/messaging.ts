import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

export interface IMessagingStore {
  removeMemberMessage?: { disciplineGroupId: string }
}

const messagingStore = create<
  IMessagingStore,
  [['zustand/subscribeWithSelector', never]]
>(subscribeWithSelector(() => ({})))

export const getMessagingStore = () => messagingStore

export const useMessagingStore = () => messagingStore(state => state)
