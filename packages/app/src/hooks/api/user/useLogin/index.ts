import api from '@/api'
import { BaseError } from '@/helpers'

import { useMutation } from 'react-query'
import Toast from 'react-native-toast-message'

import { IUseLogin } from './types'

export const useLogin = (): IUseLogin.Output => {
  const { isLoading: isLoggingIn, mutateAsync: login } = useMutation(
    (input: IUseLogin.Body) => api.user.login(input),
    {
      onError: (error: BaseError) => {
        Toast.show({
          type: 'error',
          text1: `Erro ao fazer login`,
          text2: error.message,
        })
      },
    },
  )

  return { isLoggingIn, login }
}
