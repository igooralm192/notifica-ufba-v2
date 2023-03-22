import api from '@/api'
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
    },
  )

  return { isUpdating, update }
}
