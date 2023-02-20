import api from '@/api'
import { BaseError } from '@/helpers'

import { useQuery } from '@tanstack/react-query'
import Toast from 'react-native-toast-message'

import { IUseGetUserProfilePictureUrl } from './types'

export const useGetUserProfilePictureUrl = (
  params: IUseGetUserProfilePictureUrl.Params,
  enabled = true,
): IUseGetUserProfilePictureUrl.Output => {
  const { isLoading, data } = useQuery(
    ['userProfilePicture', params.userId],
    () => api.user.getUserProfilePictureUrl(params),
    {
      enabled,
      staleTime: Infinity,
      onError: (error: BaseError) => {
        Toast.show({
          type: 'error',
          text1: `Erro ao retornar url da foto de perfil`,
          text2: error.message,
        })
      },
    },
  )

  return { isLoading, url: data?.url }
}
