import { ICreateStudentEndpoint } from '@/api/student/types'
import { useAuth } from '@/contexts/auth'
import { useCreateStudent, useLogin } from '@/hooks/api'

import React, { useContext } from 'react'

export interface RegisterPresenterContextData {
  isCreating: boolean
  register(input: ICreateStudentEndpoint.Request): Promise<void>
}

const RegisterPresenterContext = React.createContext(
  {} as RegisterPresenterContextData,
)

export const RegisterPresenter: React.FC = ({ children }) => {
  const auth = useAuth()

  const { isLoggingIn, login } = useLogin()
  const { isCreating, create } = useCreateStudent()

  const register = async (input: ICreateStudentEndpoint.Request) => {
    await create(input)

    const { token } = await login({
      email: input.email,
      password: input.password,
    })

    auth.onTokenChange(token)
  }

  return (
    <RegisterPresenterContext.Provider
      value={{ isCreating: isCreating || isLoggingIn, register }}
    >
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
