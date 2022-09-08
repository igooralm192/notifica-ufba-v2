import { IAuthenticateUserUseCase } from '@notifica-ufba/domain/usecases'
import { BaseError } from '@/helpers'

import { useAuth } from '@/contexts/auth'

import React, { useContext, useState } from 'react'
import Toast from 'react-native-toast-message'

export interface LoginPresenterContextData {
  loading: boolean
  login(input: IAuthenticateUserUseCase.Input): Promise<void>
}

const LoginPresenterContext = React.createContext(
  {} as LoginPresenterContextData,
)

export const LoginPresenter: React.FC = ({ children }) => {
  const auth = useAuth()

  const [loading, setLoading] = useState(false)

  const login = async ({ email, password }: IAuthenticateUserUseCase.Input) => {
    setLoading(true)

    try {
      await auth.login(email, password)
    } catch (err) {
      const error = err as BaseError

      Toast.show({
        type: 'error',
        text1: 'Erro ao fazer login.',
        text2: error.message,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <LoginPresenterContext.Provider value={{ loading, login }}>
      {children}
    </LoginPresenterContext.Provider>
  )
}

export const withLoginPresenter = (Component: React.FC) => {
  return (props: any) => (
    <LoginPresenter>
      <Component {...props} />
    </LoginPresenter>
  )
}

export const useLoginPresenter = () => useContext(LoginPresenterContext)
