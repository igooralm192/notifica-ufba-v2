import { create } from 'zustand'

type IProviderType = 'fonts'
type IProviderState = 'loading' | 'ready' | 'error'

export type IProviderStore = {
  [P in IProviderType]: IProviderState
} & {
  ready: (type: IProviderType) => void
}

const providerStore = create<IProviderStore>(set => ({
  fonts: 'loading',
  ready: type => {
    set({ [type]: 'ready' })
  },
}))

export const getProviderStore = () => providerStore

export const useProviderStore = () => providerStore(state => state)
