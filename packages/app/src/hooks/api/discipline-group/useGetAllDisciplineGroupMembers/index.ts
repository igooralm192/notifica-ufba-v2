import { IDisciplineGroupMemberDTO } from '@shared/dtos'
import api from '@/api'
import { BaseError } from '@/helpers'

import { useInfiniteQuery } from 'react-query'
import Toast from 'react-native-toast-message'
import { IUseGetAllDisciplineGroupMembers } from './types'

export const useGetAllDisciplineGroupMembers = (
  params: IUseGetAllDisciplineGroupMembers.Params,
  query: IUseGetAllDisciplineGroupMembers.Query,
): IUseGetAllDisciplineGroupMembers.Output => {
  const {
    isLoading,
    data,
    fetchNextPage,
    hasNextPage,
    refetch,
    isRefetching,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ['disciplineGroupMembers', params.disciplineGroupId],
    async ({ pageParam = query }) => {
      return api.disciplineGroup.getDisciplineGroupMembers(
        params.disciplineGroupId,
        {
          page: pageParam.page,
          limit: pageParam.limit,
        },
      )
    },
    {
      enabled: !!params.disciplineGroupId,
      keepPreviousData: true,
      getNextPageParam: (lastPage, pages) => {
        const allResults = pages.reduce(
          (acc, page) => [...acc, ...page.results],
          [] as IDisciplineGroupMemberDTO[],
        )

        if (allResults.length >= lastPage.total) return undefined

        return { ...query, page: pages.length }
      },
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
    isFetchingMore: isFetchingNextPage,
    isRefreshing: isRefetching,
    hasNextPage: !!hasNextPage,
    disciplineGroupMembers: data
      ? data.pages.reduce(
          (acc: IDisciplineGroupMemberDTO[], page) => [...acc, ...page.results],
          [],
        )
      : [],
    fetchNextPage,
    refresh: refetch,
  }
}
