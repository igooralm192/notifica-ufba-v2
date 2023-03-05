import api from '@/api'

import { useQuery } from 'react-query'

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
    },
  )

  return { isLoading, url: data?.url }
}
