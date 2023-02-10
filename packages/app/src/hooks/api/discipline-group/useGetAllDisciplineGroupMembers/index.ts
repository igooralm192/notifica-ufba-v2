import api from '@/api'
import { BaseError } from '@/helpers'

import { useQuery } from 'react-query'
import Toast from 'react-native-toast-message'
import { IUseGetAllDisciplineGroupMembers } from './types'

export const useGetAllDisciplineGroupMembers = (
  params: IUseGetAllDisciplineGroupMembers.Params,
): IUseGetAllDisciplineGroupMembers.Output => {
  const {
    isLoading,
    data,
    refetch,
    isRefetching,
  } = useQuery(
    ['disciplineGroupMembers', params.disciplineGroupId],
    async () => {
      return api.disciplineGroup.getDisciplineGroupMembers(params)
    },
    {
      enabled: !!params.disciplineGroupId,
      onError: (error: BaseError) => {
        Toast.show({
          type: 'error',
          text1: `Erro ao retornar lista de membros`,
          text2: error.message,
        })
      },
    },
  )

  return {
    isLoading,
    isRefreshing: isRefetching,
    disciplineGroupMembers: data?.members || [],
    refresh: refetch,
  }
}
