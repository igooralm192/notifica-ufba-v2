import { IDisciplineGroupMessage } from '@shared/entities'

import api from '@/api'
import { FullLoading } from '@/components/FullLoading'
import { BaseError } from '@/helpers'

import React, { useContext } from 'react'
import { InfiniteData, useInfiniteQuery, useQueryClient } from 'react-query'
import Toast from 'react-native-toast-message'

import { useDisciplineGroupTabsPresenter } from '../DisciplineGroupTabsPresenter'
import { useEffect } from 'react'
import { IGetDisciplineGroupMessagesEndpoint } from '@/api/discipline-group/types'
import { joinData } from '@/utils/array'

export interface DisciplineGroupChatPresenterContextData {
  isFetchingMore: boolean
  disciplineGroupMessages: IDisciplineGroupMessage[]
  onNextPage: () => void
}

type IChatFilterParams = {
  limit?: number
}

const DisciplineGroupChatPresenterContext = React.createContext(
  {} as DisciplineGroupChatPresenterContextData,
)

const initialFilter: IChatFilterParams = {
  limit: 20,
}

export const DisciplineGroupChatPresenter: React.FC = ({ children }) => {
  const { disciplineGroup } = useDisciplineGroupTabsPresenter()

  const queryClient = useQueryClient()

  const { isLoading, data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      ['disciplineGroupMessages', disciplineGroup?.id],
      async ({ pageParam = initialFilter }) => {
        return api.disciplineGroup.getDisciplineGroupMessages(
          { disciplineGroupId: disciplineGroup!.id },
          {
            nextCursor: pageParam.nextCursor,
            limit: pageParam.limit,
          },
        )
      },
      {
        enabled: !!disciplineGroup?.id,
        refetchOnMount: 'always',
        keepPreviousData: true,
        getNextPageParam: lastPage => {
          if (!lastPage.nextCursor) return undefined
          
          return { ...initialFilter, nextCursor: lastPage.nextCursor }
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

  const handleNextPage = () => {
    if (!isFetchingNextPage && hasNextPage) fetchNextPage()
  }

  useEffect(() => {
    if (!disciplineGroup?.id) return

    const unsubscribe = api.disciplineGroup.disciplineGroupMessageListener(
      { disciplineGroupId: disciplineGroup?.id },
      disciplineGroupMessages => {
        queryClient.invalidateQueries('lastMessages')

        queryClient.setQueryData<
          InfiniteData<IGetDisciplineGroupMessagesEndpoint.Response>
        >(['disciplineGroupMessages', disciplineGroup?.id], oldData => {
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
  }, [disciplineGroup?.id])

  if (isLoading) return <FullLoading />
  if (!data) return null

  return (
    <DisciplineGroupChatPresenterContext.Provider
      value={{
        isFetchingMore: isFetchingNextPage,
        disciplineGroupMessages: data.pages.reduce(
          (acc: IDisciplineGroupMessage[], page) => [...acc, ...page.results],
          [],
        ),
        onNextPage: handleNextPage,
      }}
    >
      {children}
    </DisciplineGroupChatPresenterContext.Provider>
  )
}

export const withDisciplineGroupChatPresenter = (Component: React.FC<any>) => {
  return (props: any) => {
    return (
      <DisciplineGroupChatPresenter>
        <Component {...props} />
      </DisciplineGroupChatPresenter>
    )
  }
}

export const useDisciplineGroupChatPresenter = () =>
  useContext(DisciplineGroupChatPresenterContext)
