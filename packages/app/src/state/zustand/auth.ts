import { expoStorage } from '@/adapters/expoStorage'
import { AuthState } from '@/store/auth/types'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export interface IAuthStore {
  token?: Nullable<string>

  setToken: (token: string | null) => void
}

const authStore = create(
  persist<IAuthStore>(
    set => ({
      token: undefined,
      setToken: (token: Nullable<string>) => {
        set(() => ({ token }))
      },
    }),
    {
      name: 'NOTIFICAUFBA_AUTH',
      storage: createJSONStorage(() => expoStorage),
      onRehydrateStorage: () => state => {
        if (state?.token === undefined) state?.setToken(null)
      },
    },
  ),
)

export const getAuthStore = () => authStore

export function useAuthStore(): IAuthStore
export function useAuthStore<U>(selector: (state: IAuthStore) => U): U

export function useAuthStore<U>(selector?: (state: IAuthStore) => U) {
  if (selector) return authStore<U>(selector)

  return authStore()
}

export const useAuthStateSelector = () => {
  const token = useAuthStore(state => state.token)

  if (token === undefined) return AuthState.UNKNOWN
  if (token === null) return AuthState.UNAUTHENTICATED
  else return AuthState.AUTHENTICATED
}
