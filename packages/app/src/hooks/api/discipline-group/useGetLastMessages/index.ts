import { ILastMessageDTO } from '@shared/dtos'
import api from '@/api'

import { useInfiniteQuery } from 'react-query'

import { IUseGetLastMessages } from './types'

export const useGetLastMessages = (
  query: IUseGetLastMessages.Query,
): IUseGetLastMessages.Output => {
  const {
    isLoading,
    data,
    fetchNextPage,
    hasNextPage,
    refetch,
    isRefetching,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ['lastMessages'],
    async ({ pageParam }) => {
      const pageParams = pageParam ?? query

      return api.disciplineGroup.getMyLastMessages({
        page: pageParams?.page,
        limit: pageParams?.limit,
      })
    },
    {
      keepPreviousData: true,
      getNextPageParam: (lastPage, pages) => {
        const allResults = pages.reduce(
          (acc, page) => [...acc, ...page.results],
          [] as ILastMessageDTO[],
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
    lastMessages: data
      ? data.pages.reduce(
          (acc: ILastMessageDTO[], page) => [...acc, ...page.results],
          [],
        )
      : [],
    fetchNextPage,
    refresh: refetch,
  }
}
