import { IDisciplineGroupPost } from '@shared/entities'
import api from '@/api'

import { useInfiniteQuery } from 'react-query'
import { IUseGetAllDisciplineGroupPosts } from './types'

export const useGetAllDisciplineGroupPosts = (
  params: IUseGetAllDisciplineGroupPosts.Params,
  query: IUseGetAllDisciplineGroupPosts.Query,
): IUseGetAllDisciplineGroupPosts.Output => {
  const {
    isLoading,
    data,
    fetchNextPage,
    hasNextPage,
    refetch,
    isRefetching,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ['disciplineGroupPosts', params.disciplineGroupId],
    async ({ pageParam }) => {
      const pageParams = pageParam ?? query
      
      return api.disciplineGroup.getDisciplineGroupPosts(
        params.disciplineGroupId,
        {
          page: pageParams?.page,
          limit: pageParams?.limit,
        },
      )
    },
    {
      enabled: !!params.disciplineGroupId,
      keepPreviousData: true,
      getNextPageParam: (lastPage, pages) => {
        const allResults = pages.reduce(
          (acc, page) => [...acc, ...page.results],
          [] as IDisciplineGroupPost[],
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
    disciplineGroupPosts: data
      ? data.pages.reduce(
          (acc: IDisciplineGroupPost[], page) => [...acc, ...page.results],
          [],
        )
      : [],
    fetchNextPage,
    refresh: refetch,
  }
}
