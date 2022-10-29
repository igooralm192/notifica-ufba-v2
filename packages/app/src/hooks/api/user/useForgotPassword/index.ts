import api from '@/api'
import { BaseError } from '@/helpers'

import { useMutation } from 'react-query'
import Toast from 'react-native-toast-message'

import { IUseForgotPassword } from './types'

export const useForgotPassword = (): IUseForgotPassword.Output => {
  const { isLoading: isForgotting, mutate: forgotPassword } = useMutation(
    (input: IUseForgotPassword.Body) => api.user.forgotPassword(input),
    {
      onError: (error: BaseError) => {
        Toast.show({
          type: 'error',
          text1: `Erro ao enviar e-mail de reset de senha`,
          text2: error.message,
        })
      },
    },
  )

  return {
    isForgotting,
    forgotPassword: async (input: IUseForgotPassword.Body) => forgotPassword(input),
  }
}
