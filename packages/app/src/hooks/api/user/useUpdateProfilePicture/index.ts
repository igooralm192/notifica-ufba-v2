import api from '@/api'
import { Log } from '@/config/logger'
import { useToast } from '@/contexts/toast'
import { useMutation, useQueryClient } from 'react-query'

import { IUseUpdateProfilePicture } from './types'

export const useUpdateProfilePicture = (
  userId?: string,
): IUseUpdateProfilePicture.Output => {
  const queryClient = useQueryClient()
  const toast = useToast()

  const { isLoading: isUpdating, mutateAsync: update } = useMutation(
    (input: IUseUpdateProfilePicture.Body) =>
      api.user.updateProfilePicture(input),
    {
      retry: 5,
      onSuccess: () => {
        if (userId)
          queryClient.invalidateQueries(['userProfilePicture', userId])

        toast.success('Foto de perfil atualizada com sucesso!')
      },
      onError: error => {
        // @ts-ignore
        Log.error('Update Profile Picture Error', { error })
      },
    },
  )

  return { isUpdating, update }
}
