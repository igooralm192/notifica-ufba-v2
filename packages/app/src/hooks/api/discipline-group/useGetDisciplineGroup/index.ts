import api from '@/api'
import { useQuery } from 'react-query'
import { IUseGetDisciplineGroup } from './types'

export const useGetDisciplineGroup = (
  params: IUseGetDisciplineGroup.Params,
): IUseGetDisciplineGroup.Output => {
  const { isLoading, data } = useQuery(
    ['disciplineGroups', params.disciplineGroupId],
    () => api.disciplineGroup.getDisciplineGroup(params.disciplineGroupId),
  )

  return {
    isLoading,
    disciplineGroup: data?.disciplineGroup || null,
  }
}
