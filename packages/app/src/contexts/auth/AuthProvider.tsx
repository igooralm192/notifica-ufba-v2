import api from '@/api'
import { useToast } from '@/contexts/toast'
import { BaseError } from '@/helpers'
import { useAuthStateSelector, useAuthStore } from '@/state/zustand/auth'
import { AuthState } from '@/store/auth/types'

import React, { useContext, useEffect } from 'react'
import { useQueryClient } from 'react-query'

export interface AuthContextData {
  state: AuthState
  signIn: (token: string) => void
  signOut: () => void
}

const AuthContext = React.createContext({} as AuthContextData)

const AuthProviderBase: React.FC<React.PropsWithChildren> = ({ children }) => {
  const store = useAuthStore()
  const authState = useAuthStateSelector()

  const queryClient = useQueryClient()
  const toast = useToast()

  const signIn = (token: string) => store.setToken(token)
  const signOut = () => store.setToken(null)

  useEffect(() => {
    queryClient.invalidateQueries(['user'])
    queryClient.invalidateQueries(['disciplineGroups'])
    queryClient.invalidateQueries(['lastMessages'])
  }, [authState])

  useEffect(() => {
    const interceptorId = api.instance.interceptors.response.use(
      undefined,
      async (error: BaseError) => {
        if (error.code === 'ExpiredTokenError') {
          signOut()

          toast.error('Seu token expirou, favor realizar login novamente.')
        }

        return Promise.reject(error)
      },
    )

    return () => api.instance.interceptors.response.eject(interceptorId)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        state: authState,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const AuthProvider = AuthProviderBase

export const useAuth = () => useContext(AuthContext)
