import api from '@/api'
import { AuthState } from '@/store/auth/types'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  atom,
  noWait,
  selector,
  waitForAll,
  waitForAllSettled,
  waitForNone,
} from 'recoil'

interface IApiState {
  initialized: boolean
}

export const apiState = atom<IApiState>({
  key: 'ApiState',
  default: { initialized: false },
})

// export const tokenQuery = selector<string | null>({
//   key: 'TokenQuery',
//   get: async () => {
//     console.log('GET TOKEN')
//     return AsyncStorage.getItem('TOKEN')
//   },
//   set: ({ set }, token) => {
//     set(tokenState, { initialized: true, value: token } as ITokenState)
//   },
// // })

// export const authStateQuery = selector<AuthState>({
//   key: 'AuthStateQuery',
//   get: ({ get }) => {
//     const token = get(tokenState)

//     console.log('ON AUTH STATE', token)

//     if (token) return AuthState.AUTHENTICATED
//     else return AuthState.UNAUTHENTICATED
//   },
// })
