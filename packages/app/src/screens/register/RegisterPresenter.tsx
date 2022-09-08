import {
  IAuthenticateUserUseCase,
  ICreateStudentUseCase,
} from '@notifica-ufba/domain/usecases'
import { BaseError } from '@/helpers'

import api from '@/api'
import { useAuth } from '@/contexts/auth'

import React, { useContext, useState } from 'react'
import Toast from 'react-native-toast-message'

export interface RegisterPresenterContextData {
  loading: boolean
  register(input: IAuthenticateUserUseCase.Input): Promise<void>
}

const RegisterPresenterContext = React.createContext(
  {} as RegisterPresenterContextData,
)

export const RegisterPresenter: React.FC = ({ children }) => {
  const auth = useAuth()

  const [loading, setLoading] = useState(false)

  const register = async ({
    name,
    email,
    password,
    matriculation,
    course,
  }: ICreateStudentUseCase.Input) => {
    setLoading(true)

    try {
      await api.student.createStudent({
        name,
        email,
        password,
        matriculation,
        course,
      })

      await auth.login(email, password)
    } catch (err) {
      const error = err as BaseError

      Toast.show({
        type: 'error',
        text1: 'Erro ao fazer cadastro.',
        text2: error.message,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <RegisterPresenterContext.Provider value={{ loading, register }}>
      {children}
    </RegisterPresenterContext.Provider>
  )
}

export const withRegisterPresenter = (Component: React.FC) => {
  return (props: any) => (
    <RegisterPresenter>
      <Component {...props} />
    </RegisterPresenter>
  )
}

export const useRegisterPresenter = () => useContext(RegisterPresenterContext)
