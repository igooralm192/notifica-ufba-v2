import { IDisciplineGroup } from '@shared/entities'
import api from '@/api'
import { BaseError } from '@/helpers'

import { useInfiniteQuery } from 'react-query'
import Toast from 'react-native-toast-message'
import { IUseGetAllDisciplineGroups } from './types'

export const useGetAllDisciplineGroups = (
  query: IUseGetAllDisciplineGroups.Query,
): IUseGetAllDisciplineGroups.Output => {
  const {
    isLoading,
    data,
    fetchNextPage,
    hasNextPage,
    refetch,
    isRefetching,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ['disciplineGroups', query],
    async ({ pageParam = query }) => {
      return api.disciplineGroup.getDisciplineGroups({
        query: {
          studentId: pageParam.studentId,
          teacherId: pageParam.teacherId,
          search: pageParam.search,
        },
        page: pageParam.page,
        limit: pageParam.limit,
      })
    },
    {
      // enabled: !!query.studentId || !!query.teacherId,
      keepPreviousData: true,
      getNextPageParam: (lastPage, pages) => {
        const allResults = pages.reduce(
          (acc, page) => [...acc, ...page.results],
          [] as IDisciplineGroup[],
        )

        if (allResults.length >= lastPage.total) return undefined

        return { ...query, page: pages.length }
      },
      onError: (error: BaseError) => {
        Toast.show({
          type: 'error',
          text1: `Erro ao retornar lista de turmas`,
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
    disciplineGroups: data
      ? data.pages.reduce(
          (acc: IDisciplineGroup[], page) => [...acc, ...page.results],
          [],
        )
      : [],
    fetchNextPage,
    refresh: refetch,
  }
}
