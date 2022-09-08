import { navigationRef } from '@/components/Providers'
import { atom } from 'recoil'

export interface ILoaderState {
  loading: boolean
}

export const loaderState = atom<ILoaderState>({
  key: 'Loader',
  default: { loading: false },
  effects: [
    ({ onSet }) => {
      onSet((newLoader, oldLoader) => {
        const newLoading = newLoader.loading
        const oldLoading = (oldLoader as ILoaderState).loading

        if (!navigationRef.isReady()) return

        if (!oldLoading && newLoading) navigationRef.navigate('LoadingScreen')
        if (oldLoading && !newLoading) navigationRef.goBack()
      })
    },
  ],
})
