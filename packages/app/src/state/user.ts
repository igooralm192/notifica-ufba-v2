import { IUser } from '@shared/entities'
import { getMyUser } from '@/api/user'
import { AuthState } from '@/store/auth/types'

import { atom, selector, selectorFamily } from 'recoil'
import { authStateQuery } from '@/state/auth'
import Toast from 'react-native-toast-message'
import { BaseError } from '@/helpers'

export const currentUserState = atom<IUser | null>({
  key: 'CurrentUserState',
  default: selector<IUser | null>({
    key: 'CurrentUserState/Default',
    get: ({ get }) => {
      const authState = get(authStateQuery)

      return get(loadUserQuery(authState))
    },
  }),
})

export const loadUserQuery = selectorFamily<IUser | null, AuthState>({
  key: 'LoadUserQuery',
  get: authState => async () => {
    try {
      if (authState === AuthState.UNAUTHENTICATED) return null

      const response = await getMyUser()

      return response.user
    } catch (err) {
      const error = err as BaseError

      Toast.show({
        type: 'error',
        text1: 'Erro ao retornar usuário.',
        text2: error.message,
      })

      return null
    }
  },
})
