import api from '@/api'
import { useToast } from '@/contexts/toast'
import { useMutation, useQueryClient } from 'react-query'

import { IUseUpdateTeacher } from './types'

export const useUpdateMyTeacher = (): IUseUpdateTeacher.Output => {
  const queryClient = useQueryClient()
  const toast = useToast()

  const { isLoading: isUpdating, mutateAsync: update } = useMutation(
    (body: IUseUpdateTeacher.Body) => api.teacher.patchMyTeacher(body),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['user'])

        toast.success('Perfil atualizado com sucesso!')
      },
    },
  )

  return { isUpdating, update }
}
