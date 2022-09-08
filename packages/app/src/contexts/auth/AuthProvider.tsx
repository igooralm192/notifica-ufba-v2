import api from '@/api'
import { authStateQuery, tokenState } from '@/state/auth'
import { AuthState } from '@/store/auth/types'

import React, { useContext } from 'react'
import {
  useRecoilValue,
  useSetRecoilState,
} from 'recoil'

export interface AuthContextData {
  state: AuthState

  login(email: string, password: string): Promise<void>
  logout(): Promise<void>
}

const AuthContext = React.createContext({} as AuthContextData)

const AuthProviderBase: React.FC = ({ children }) => {
  const authStateValue = useRecoilValue(authStateQuery)
  const setTokenState = useSetRecoilState(tokenState)

  const changeToken = (token: string | null) => {
    setTokenState(token)
  }

  const login = async (email: string, password: string) => {
    const { token } = await api.user.login({ email, password })

    changeToken(token)
  }

  const logout = async () => {
    changeToken(null)
  }
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

  console.log('AUTH STATE', authStateValue)

  return (
    <AuthContext.Provider value={{ state: authStateValue, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const AuthProvider = AuthProviderBase

export const useAuth = () => useContext(AuthContext)
