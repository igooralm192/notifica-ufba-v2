import api from '@/api'
import { BaseError } from '@/helpers'

import { useMutation, useQueryClient } from 'react-query'
import Toast from 'react-native-toast-message'

import { IUseUpdateProfilePicture } from './types'

export const useUpdateProfilePicture = (
  userId?: string,
): IUseUpdateProfilePicture.Output => {
  const queryClient = useQueryClient()

  const { isLoading: isUpdating, mutateAsync: update } = useMutation(
    (input: IUseUpdateProfilePicture.Body) =>
      api.user.updateProfilePicture(input),
    {
      retry: true,
      onSuccess: () => {
        if (userId)
          queryClient.invalidateQueries(['userProfilePicture', userId])
      },
      onError: (error: BaseError) => {
        Toast.show({
          type: 'error',
          text1: `Erro ao foto de perfil do usuário`,
          text2: error.message,
        })
      },
    },
  )

  return { isUpdating, update }
}
