import api from '@/api'

import { useQuery } from 'react-query'

import { IUseGetMyUser } from './types'

export const useGetMyUser = (
  params: IUseGetMyUser.Params,
): IUseGetMyUser.Output => {
  const { isLoading, data } = useQuery(['user'], () => api.user.getMyUser(), {
    enabled: params.isAuthenticated,
  })

  return { isLoading, user: data?.user || null }
}
