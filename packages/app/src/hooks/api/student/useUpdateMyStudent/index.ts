import api from '@/api'
import { BaseError } from '@/helpers'

import { useMutation, useQueryClient } from 'react-query'
import Toast from 'react-native-toast-message'

import { IUseUpdateStudent } from './types'

export const useUpdateMyStudent = (): IUseUpdateStudent.Output => {
  const queryClient = useQueryClient()

  const { isLoading: isUpdating, mutateAsync: update } = useMutation(
    (body: IUseUpdateStudent.Body) => api.student.patchMyStudent(body),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['user'])
      }, 
      onError: (error: BaseError) => {
        Toast.show({
          type: 'error',
          text1: `Erro ao atualizar um estudante`,
          text2: error.message,
        })
      },
    },
  )

  return { isUpdating, update }
}
