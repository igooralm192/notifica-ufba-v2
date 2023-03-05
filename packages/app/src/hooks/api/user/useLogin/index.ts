import api from '@/api'
import { useMutation } from 'react-query'
import { IUseLogin } from './types'

export const useLogin = (): IUseLogin.Output => {
  const { isLoading: isLoggingIn, mutateAsync: login } = useMutation(
    (input: IUseLogin.Body) => api.user.login(input),
  )

  return { isLoggingIn, login }
}
