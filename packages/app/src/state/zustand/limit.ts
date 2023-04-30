import { create } from 'zustand'

export type ILimitType =
  | 'createMessage'
  | 'sendFeedback'
  | 'generatePost'
  | 'generateMessage'
export type ILimitData = { used: number; total: number }

export type ILimitStore = {
  [P in ILimitType]: ILimitData
} & {
  inc(type: ILimitType): boolean
  available(type: ILimitType): boolean
}

const limitStore = create<ILimitStore>((set, get) => ({
  createMessage: { used: 0, total: 20 },
  sendFeedback: { used: 0, total: 5 },
  generatePost: { used: 0, total: 5 },
  generateMessage: { used: 0, total: 5 },
  inc: type => {
    const limit = get()[type]

    if (limit.used === limit.total) return false

    set({ [type]: { ...limit, used: limit.used + 1 } })

    return true
  },
  available: (type) => { 
    const limit = get()[type]

    return limit.used < limit.total
  }
}))

export const getLimitStore = () => limitStore

export const useLimitStore = () => limitStore(state => state)
