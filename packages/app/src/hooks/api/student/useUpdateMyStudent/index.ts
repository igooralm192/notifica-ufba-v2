import api from '@/api'
import { useToast } from '@/contexts/toast'
import { useMutation, useQueryClient } from 'react-query'

import { IUseUpdateStudent } from './types'

export const useUpdateMyStudent = (): IUseUpdateStudent.Output => {
  const queryClient = useQueryClient()
  const toast = useToast()

  const { isLoading: isUpdating, mutateAsync: update } = useMutation(
    (body: IUseUpdateStudent.Body) => api.student.patchMyStudent(body),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['user'])

        toast.success('Perfil atualizado com sucesso!')
      }, 
    },
  )

  return { isUpdating, update }
}
