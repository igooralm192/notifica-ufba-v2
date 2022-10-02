import { AuthState } from '@/store/auth/types'
import create from 'zustand'

export interface IAuthStore {
  token?: Nullable<string>

  setToken: (token: Nullable<string>) => void
}

const authStore = create<IAuthStore>(set => ({
  setToken: (token: Nullable<string>) => {
    set(() => ({ token }))
  },
}))

export const getAuthStore = () => authStore

export const useAuthStore = () => authStore(state => state)

export const useAuthStateSelector = () =>
  authStore(({ token }) => {
    if (token === undefined) return AuthState.UNKNOWN

    if (token === null) return AuthState.UNAUTHENTICATED
    else return AuthState.AUTHENTICATED
  })
