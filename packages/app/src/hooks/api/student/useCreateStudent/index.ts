import api from '@/api'
import { BaseError } from '@/helpers'

import { useMutation } from 'react-query'
import Toast from 'react-native-toast-message'

import { IUseCreateStudent } from './types'

export const useCreateStudent = (): IUseCreateStudent.Output => {
  const { isLoading: isCreating, mutateAsync: create } = useMutation(
    (input: IUseCreateStudent.Body) => api.student.createStudent(input),
    {
      onError: (error: BaseError) => {
        Toast.show({
          type: 'error',
          text1: `Erro ao cadastrar um estudante`,
          text2: error.message,
        })
      },
    },
  )

  return { isCreating, create }
}
