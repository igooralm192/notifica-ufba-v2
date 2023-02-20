import api from '@/api'
import { BaseError } from '@/helpers'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import Toast from 'react-native-toast-message'

import { IUseUpdateTeacher } from './types'

export const useUpdateMyTeacher = (): IUseUpdateTeacher.Output => {
  const queryClient = useQueryClient()

  const { isLoading: isUpdating, mutateAsync: update } = useMutation(
    (body: IUseUpdateTeacher.Body) => api.teacher.patchMyTeacher(body),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['user'])
      }, 
      onError: (error: BaseError) => {
        Toast.show({
          type: 'error',
          text1: `Erro ao atualizar um professor`,
          text2: error.message,
        })
      },
    },
  )

  return { isUpdating, update }
}
