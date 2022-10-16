import api from '@/api'
import { BaseError } from '@/helpers'

import { useQuery } from 'react-query'
import Toast from 'react-native-toast-message'

import { IUseGetMyUser } from './types'

export const useGetMyUser = (
  params: IUseGetMyUser.Params,
): IUseGetMyUser.Output => {
  const { isLoading, data } = useQuery(
    'user',
    () => api.user.getMyUser(),
    {
      enabled: params.isAuthenticated,
      onError: (error: BaseError) => {
        Toast.show({
          type: 'error',
          text1: `Erro ao retornar usuário`,
          text2: error.message,
        })
      },
    },
  )

  return { isLoading, user: data?.user }
}
