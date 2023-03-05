import api from '@/api'

import { useQuery } from 'react-query'
import { IUseGetAllDisciplineGroupMembers } from './types'

export const useGetAllDisciplineGroupMembers = (
  params: IUseGetAllDisciplineGroupMembers.Params,
): IUseGetAllDisciplineGroupMembers.Output => {
  const { isLoading, data, refetch, isRefetching } = useQuery(
    ['disciplineGroupMembers', params.disciplineGroupId],
    async () => {
      return api.disciplineGroup.getDisciplineGroupMembers(params)
    },
    {
      enabled: !!params.disciplineGroupId,
    },
  )

  return {
    isLoading,
    isRefreshing: isRefetching,
    disciplineGroupMembers: data?.members || [],
    refresh: refetch,
  }
}
