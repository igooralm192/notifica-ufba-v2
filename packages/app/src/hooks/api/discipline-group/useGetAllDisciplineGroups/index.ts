import { IDisciplineGroup } from '@shared/entities'
import api from '@/api'

import { useInfiniteQuery } from 'react-query'
import { IUseGetAllDisciplineGroups } from './types'

export const useGetAllDisciplineGroups = (
  query: IUseGetAllDisciplineGroups.Query,
): IUseGetAllDisciplineGroups.Output => {
  const {
    isLoading,
    isFetching,
    data,
    fetchNextPage,
    hasNextPage,
    refetch,
    isRefetching,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ['disciplineGroups', query],
    async ({ pageParam }) => {
      const pageParams = pageParam ?? query

      return api.disciplineGroup.getDisciplineGroups({
        query: {
          studentId: pageParams?.studentId,
          teacherId: pageParams?.teacherId,
          search: pageParams?.search,
        },
        page: pageParams?.page,
        limit: pageParams?.limit,
      })
    },
    {
      enabled: !!query.studentId || !!query.teacherId,
      keepPreviousData: true,
      getNextPageParam: (lastPage, pages) => {
        const allResults = pages.reduce(
          (acc, page) => [...acc, ...page.results],
          [] as IDisciplineGroup[],
        )

        if (allResults.length >= lastPage.total) return undefined

        return { ...query, page: pages.length }
      },
    },
  )

  return {
    isLoading,
    isFetching,
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
