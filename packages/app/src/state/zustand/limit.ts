import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type ILimitType = 'createMessage' | 'sendFeedback'
export type ILimitData = { used: number; total: number }

export type ILimitStore = {
  [P in ILimitType]: ILimitData
} & {
  inc(type: ILimitType): boolean
}

const limitStore = create(
  persist<ILimitStore>(
    (set, get) =>
      ({
        createMessage: { used: 0, total: 10 },
        sendFeedback: { used: 0, total: 5 },
        inc: type => {
          const limit = get()[type]

          if (limit.used === limit.total) return false

          set({ [type]: { ...limit, used: limit.used + 1 } })

          return true
        },
      } as ILimitStore),
    {
      name: '@notifica-ufba/limit',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
)

export const getLimitStore = () => limitStore

export const useLimitStore = () => limitStore(state => state)
