import api from '@/api'
import { useMutation } from 'react-query'

import { IUseUpdateMyUser } from './types'

export const useUpdateMyUser = (): IUseUpdateMyUser.Output => {
  const { isLoading: isUpdating, mutateAsync: update } = useMutation(
    (input: IUseUpdateMyUser.Params) => api.user.patchMyUser(input),
  )

  return { isUpdating, update }
}
