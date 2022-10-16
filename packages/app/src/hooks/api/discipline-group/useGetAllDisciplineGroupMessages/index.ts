import { IDisciplineGroupMessage } from '@shared/entities'
import api from '@/api'
import { IGetDisciplineGroupMessagesEndpoint } from '@/api/discipline-group/types'
import { BaseError } from '@/helpers'
import { joinData } from '@/utils/array'

import { useEffect } from 'react'
import { InfiniteData, useInfiniteQuery, useQueryClient } from 'react-query'
import Toast from 'react-native-toast-message'
import { IUseGetAllDisciplineGroupMessages } from './types'

export const useGetAllDisciplineGroupMessages = (
  params: IUseGetAllDisciplineGroupMessages.Params,
  query: IUseGetAllDisciplineGroupMessages.Query,
): IUseGetAllDisciplineGroupMessages.Output => {
  const queryClient = useQueryClient()

  const { isLoading, data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      ['disciplineGroupMessages', params.disciplineGroupId],
      async ({ pageParam = query }) => {
        return api.disciplineGroup.getDisciplineGroupMessages(
          { disciplineGroupId: params.disciplineGroupId },
          {
            nextCursor: pageParam.nextCursor,
            limit: pageParam.limit,
          },
        )
      },
      {
        enabled: !!params.disciplineGroupId,
        keepPreviousData: true,
        getNextPageParam: lastPage => {
          if (!lastPage.nextCursor) return undefined

          return { ...query, nextCursor: lastPage.nextCursor }
        },
        onError: (error: BaseError) => {
          Toast.show({
            type: 'error',
            text1: `Erro ao retornar as mensagens do chat desta turma`,
            text2: error.message,
          })
        },
      },
    )

  useEffect(() => {
    const unsubscribe = api.disciplineGroup.disciplineGroupMessageListener(
      { disciplineGroupId: params.disciplineGroupId },
      disciplineGroupMessages => {
        queryClient.invalidateQueries('lastMessages')

        queryClient.setQueryData<
          InfiniteData<IGetDisciplineGroupMessagesEndpoint.Response>
        >(['disciplineGroupMessages', params.disciplineGroupId], oldData => {
          if (!oldData) return { pages: [], pageParams: [] }

          const restPages = oldData.pages.slice(0, oldData.pages.length - 1)
          const lastPage = oldData.pages[oldData.pages.length - 1]

          lastPage.results = joinData(
            lastPage.results,
            disciplineGroupMessages,
            (a, b) => a.id === b.id,
            'sentAt',
            'desc',
          )

          return {
            pages: [...restPages, lastPage],
            pageParams: oldData.pageParams,
          }
        })
      },
    )

    return () => unsubscribe()
  }, [params.disciplineGroupId])

  return {
    isLoading,
    isFetchingMore: isFetchingNextPage,
    hasNextPage: !!hasNextPage,
    disciplineGroupMessages: data
      ? data.pages.reduce(
          (acc: IDisciplineGroupMessage[], page) => [...acc, ...page.results],
          [],
        )
      : [],
    fetchNextPage,
  }
}
