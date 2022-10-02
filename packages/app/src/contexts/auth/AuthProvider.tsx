import api from '@/api'
import { authStateQuery, tokenState } from '@/state/auth'
import { getAuthStore, useAuthStateSelector, useAuthStore } from '@/state/zustand/auth'
import { AuthState } from '@/store/auth/types'

import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

export interface AuthContextData {
  state: AuthState

  login(email: string, password: string): Promise<void>
  logout(): Promise<void>
}

const AuthContext = React.createContext({} as AuthContextData)

const AuthProviderBase: React.FC = ({ children }) => {
  const store = useAuthStore()

  const authState = useAuthStateSelector()
  
  const changeToken = (token: string | null) => {
    store.setToken(token)
  }

  const login = async (email: string, password: string) => {
    const { token } = await api.user.login({ email, password })

    changeToken(token)
  }

  const logout = async () => {
    changeToken(null)
  }

  useEffect(() => {
    AsyncStorage.getItem('TOKEN').then(store.setToken)

    const unsubscribe = getAuthStore().subscribe(async ({ token }) => {
      if (token) await AsyncStorage.setItem('TOKEN', token)
      else await AsyncStorage.removeItem('TOKEN')
    })

    return () => unsubscribe()
  }, [])
  // useEffect(() => {
  //   const interceptorId = api.interceptors.response.use(
  //     undefined,
  //     async (error: BaseError) => {
  //       if (error.statusCode === 401) {
  //         await logout()

  //         toast({
  //           description: error.message,
  //           status: 'error',
  //         })
  //       }

  //       return Promise.reject(error)
  //     }
  //   )

  //   return () => api.interceptors.response.eject(interceptorId)
  // }, [])

  console.log('AUTH STATE', store)

  return (
    <AuthContext.Provider value={{ state: authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const AuthProvider = AuthProviderBase

export const useAuth = () => useContext(AuthContext)
