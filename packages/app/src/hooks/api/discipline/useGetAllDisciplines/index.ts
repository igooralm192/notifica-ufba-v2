import { IDiscipline } from '@shared/entities'
import api from '@/api'
import { BaseError } from '@/helpers'

import { useInfiniteQuery } from 'react-query'
import Toast from 'react-native-toast-message'
import { IUseGetAllDisciplines } from './types'

export const useGetAllDisciplines = (
  query: IUseGetAllDisciplines.Query,
): IUseGetAllDisciplines.Output => {
  const {
    isLoading,
    data,
    fetchNextPage,
    hasNextPage,
    refetch,
    isRefetching,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ['disciplines', query],
    async ({ pageParam = query }) => {
      return api.discipline.getDisciplines({
        page: pageParam.page,
        limit: pageParam.limit,
        code: pageParam.code,
      })
    },
    {
      keepPreviousData: true,
      cacheTime: 0,
      staleTime: 0,
      getNextPageParam: (lastPage, pages) => {
        const allResults = pages.reduce(
          (acc, page) => [...acc, ...page.results],
          [] as IDiscipline[],
        )

        if (allResults.length >= lastPage.total) return undefined

        return { ...query, page: pages.length }
      },
      onError: (error: BaseError) => {
        Toast.show({
          type: 'error',
          text1: `Erro ao retornar lista de disciplinas`,
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
    disciplines: data
      ? data.pages.reduce(
          (acc: IDiscipline[], page) => [...acc, ...page.results],
          [],
        )
      : [],
    fetchNextPage,
    refresh: refetch,
  }
}
