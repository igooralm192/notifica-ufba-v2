import api from '@/api'
import { BaseError } from '@/helpers'

import { useMutation } from 'react-query'
import Toast from 'react-native-toast-message'

import { IUseUpdateMyUser } from './types'

export const useUpdateMyUser = (): IUseUpdateMyUser.Output => {
  const { isLoading: isUpdating, mutateAsync: update } = useMutation(
    (input: IUseUpdateMyUser.Params) => api.user.patchMyUser(input),
    {
      onError: (error: BaseError) => {
        Toast.show({
          type: 'error',
          text1: `Erro ao atualizar dados do usuário`,
          text2: error.message,
        })
      },
    },
  )

  return { isUpdating, update }
}
