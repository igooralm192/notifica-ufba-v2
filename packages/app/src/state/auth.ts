import { AuthState } from '@/store/auth/types'
import { delay } from '@/utils/delay'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { atom, noWait, selector, waitForAll, waitForAllSettled } from 'recoil'

export const tokenState = atom<string | null>({
  key: 'TokenState',
  effects: [
    ({ trigger, onSet, setSelf }) => {
      if (trigger === 'get') setSelf(AsyncStorage.getItem('TOKEN'))

      onSet(async token => {
        if (token) await AsyncStorage.setItem('TOKEN', token)
        else await AsyncStorage.removeItem('TOKEN')
      })
    },
  ],
})

export const authStateQuery = selector<AuthState>({
  key: 'AuthStateQuery',
  get: ({ get }) => {
    console.log('AUTH STATE QUERY')
    const token = get(noWait(tokenState))

    console.log('AUTH STATE QUERY AFTER')

    if (token.state === 'loading') return AuthState.UNKNOWN

    if (token.getValue()) return AuthState.AUTHENTICATED
    else return AuthState.UNAUTHENTICATED
  },
})
