import { IDiscipline } from '@shared/entities'
import api from '@/api'

import { useInfiniteQuery } from 'react-query'
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
    async ({ pageParam }) => {
      const pageParams = pageParam ?? query

      return api.discipline.getDisciplines({
        page: pageParams?.page,
        limit: pageParams?.limit,
        code: pageParams?.code,
        teacherId: pageParams?.teacherId,
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
