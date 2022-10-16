import { IDisciplineGroupPost } from '@shared/entities'
import api from '@/api'
import { BaseError } from '@/helpers'

import { useInfiniteQuery } from 'react-query'
import Toast from 'react-native-toast-message'
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
    async ({ pageParam = query }) => {
      return api.disciplineGroup.getDisciplineGroupPosts(
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
          [] as IDisciplineGroupPost[],
        )

        if (allResults.length >= lastPage.total) return undefined

        return { ...query, page: pages.length }
      },
      onError: (error: BaseError) => {
        Toast.show({
          type: 'error',
          text1: `Erro ao retornar lista de postagens`,
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
