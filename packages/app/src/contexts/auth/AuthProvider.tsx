import api from '@/api'
import { BaseError } from '@/helpers'
import {
  getAuthStore,
  useAuthStateSelector,
  useAuthStore,
} from '@/state/zustand/auth'
import { AuthState } from '@/store/auth/types'

import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useContext, useEffect } from 'react'
import Toast from 'react-native-toast-message'
import { useQueryClient } from 'react-query'

export interface AuthContextData {
  state: AuthState
  onTokenChange: (token: string | null) => void
}

const AuthContext = React.createContext({} as AuthContextData)

const AuthProviderBase: React.FC = ({ children }) => {
  const store = useAuthStore()
  const authState = useAuthStateSelector()

  const queryClient = useQueryClient()

  const handleTokenChange = (token: string | null) => {
    store.setToken(token)
  }

  useEffect(() => {
    queryClient.invalidateQueries(['user'])
    queryClient.invalidateQueries(['disciplineGroups'])
    queryClient.invalidateQueries(['lastMessages'])
  }, [authState])

  useEffect(() => {
    AsyncStorage.getItem('TOKEN').then(store.setToken)

    const unsubscribe = getAuthStore().subscribe(async ({ token }) => {
      if (token) await AsyncStorage.setItem('TOKEN', token)
      else await AsyncStorage.removeItem('TOKEN')
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const interceptorId = api.instance.interceptors.response.use(
      undefined,
      async (error: BaseError) => {
        if (error.code === 'ExpiredTokenError') {
          handleTokenChange(null)

          Toast.show({
            type: 'error',
            text1: 'Token expirado',
            text2: 'Seu token expirou, favor realizar login novamente.',
          })
        }

        return Promise.reject(error)
      },
    )

    return () => api.instance.interceptors.response.eject(interceptorId)
  }, [])

  return (
    <AuthContext.Provider
      value={{ state: authState, onTokenChange: handleTokenChange }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const AuthProvider = AuthProviderBase

export const useAuth = () => useContext(AuthContext)
