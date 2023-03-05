import api from '@/api'
import { useMutation } from 'react-query'

import { IUseCreateStudent } from './types'

export const useCreateStudent = (): IUseCreateStudent.Output => {
  const { isLoading: isCreating, mutateAsync: create } = useMutation(
    (input: IUseCreateStudent.Body) => api.student.createStudent(input),
  )

  return { isCreating, create }
}
