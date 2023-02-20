import { IDisciplineGroupMessage } from '@shared/entities'
import api from '@/api'
import { IGetDisciplineGroupMessagesEndpoint } from '@/api/discipline-group/types'
import { BaseError } from '@/helpers'
import { joinData } from '@/utils/array'

import { useEffect } from 'react'
import {
  InfiniteData,
  useInfiniteQuery,
  useQueryClient,
} from '@tanstack/react-query'
import Toast from 'react-native-toast-message'
import { IUseGetAllDisciplineGroupMessages } from './types'

export const useGetAllDisciplineGroupMessages = (
  params: IUseGetAllDisciplineGroupMessages.Params,
  query: IUseGetAllDisciplineGroupMessages.Query,
  enabled = true
): IUseGetAllDisciplineGroupMessages.Output => {
  const queryClient = useQueryClient()

  const { isLoading, data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      ['disciplineGroupMessages', params.disciplineGroupId],
      async ({ pageParam }) => {
        const pageParams = pageParam ?? query

        return api.disciplineGroup.getDisciplineGroupMessages(
          { disciplineGroupId: params.disciplineGroupId },
          {
            nextCursor: pageParams?.nextCursor,
            limit: pageParams?.limit,
          },
        )
      },
      {
        enabled,
        keepPreviousData: true,
        getNextPageParam: lastPage => {
          if (!lastPage || !lastPage.nextCursor) return undefined

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
    if (isLoading || !enabled) return

    const firstMessage = data?.pages?.[0].results?.[0]

    const unsubscribe = api.disciplineGroup.addedMessagesListener(
      { disciplineGroupId: params.disciplineGroupId },
      { from: firstMessage?.sentAt },
      messages => {
        queryClient.invalidateQueries(['lastMessages'])

        queryClient.setQueryData<
          InfiniteData<IGetDisciplineGroupMessagesEndpoint.Response>
        >(['disciplineGroupMessages', params.disciplineGroupId], oldData => {
          if (!oldData) return { pages: [], pageParams: [] }

          const firstPage = oldData.pages[0]
          const restPages = oldData.pages.slice(1, oldData.pages.length)

          firstPage.results = joinData(
            firstPage.results,
            messages,
            (a, b) => a.id === b.id,
            'sentAt',
            'desc',
          )

          return {
            pages: [firstPage, ...restPages],
            pageParams: oldData.pageParams,
          }
        })
      },
    )

    return () => unsubscribe()
  }, [params.disciplineGroupId, isLoading, enabled])

  useEffect(() => {
    if (isLoading || !enabled) return

    const unsubscribe = api.disciplineGroup.removedMessagesListener(
      { disciplineGroupId: params.disciplineGroupId },
      messages => {
        queryClient.invalidateQueries(['lastMessages'])

        const removedMessageIds = messages.map(m => m.id)

        queryClient.setQueryData<
          InfiniteData<IGetDisciplineGroupMessagesEndpoint.Response>
        >(['disciplineGroupMessages', params.disciplineGroupId], oldData => {
          if (!oldData) return { pages: [], pageParams: [] }

          const firstPages = oldData.pages.slice(0, oldData.pages.length - 1)
          const lastPage = oldData.pages[oldData.pages.length - 1]

          oldData.pages.forEach(page => {
            page.results = page.results.filter(
              r => !removedMessageIds.includes(r.id),
            )
          })

          if (
            lastPage?.nextCursor &&
            removedMessageIds.includes(lastPage?.nextCursor)
          ) {
            lastPage.nextCursor =
              lastPage.results.length > 0
                ? lastPage.results[lastPage.results.length - 1].id
                : firstPages.length > 0
                ? firstPages[firstPages.length - 1].nextCursor
                : undefined
          }

          return oldData
        })
      },
    )

    return () => unsubscribe()
  }, [params.disciplineGroupId, isLoading, enabled])

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
