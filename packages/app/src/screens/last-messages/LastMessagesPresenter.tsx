import { ILastMessageDTO } from '@shared/dtos'

import api from '@/api'
import { FullLoading } from '@/components/FullLoading'
import { BaseError } from '@/helpers'
import { IFilterParams } from '@/types/list'

import React, { useContext } from 'react'
import Toast from 'react-native-toast-message'
import { useInfiniteQuery } from 'react-query'

export interface LastMessagesPresenterContextData {
  isFetchingMore: boolean
  isRefreshing: boolean
  lastMessages: ILastMessageDTO[]
  onNextPage: () => void
  onRefresh: () => void
}

const LastMessagesPresenterContext = React.createContext(
  {} as LastMessagesPresenterContextData,
)

const initialFilter: IFilterParams = {
  page: 0,
  limit: 10,
}

export const LastMessagesPresenter: React.FC = ({ children }) => {
  const {
    isLoading,
    data,
    fetchNextPage,
    hasNextPage,
    refetch,
    isRefetching,
    isFetchingNextPage,
  } = useInfiniteQuery(
    'lastMessages',
    async ({ pageParam = initialFilter }) => {
      return api.disciplineGroup.getMyLastMessages({
        page: pageParam.page,
        limit: pageParam.limit,
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

        return { ...initialFilter, page: pages.length }
      },
      onError: (error: BaseError) => {
        Toast.show({
          type: 'error',
          text1: `Erro ao retornar as últimas mensagens das suas turmas`,
          text2: error.message,
        })
      },
    },
  )

  const handleNextPage = () => {
    if (!isFetchingNextPage && hasNextPage) fetchNextPage()
  }

  const handleRefresh = () => {
    refetch()
  }

  if (isLoading) return <FullLoading />
  if (!data) return null

  return (
    <LastMessagesPresenterContext.Provider
      value={{
        isFetchingMore: isFetchingNextPage,
        isRefreshing: isRefetching,
        lastMessages: data.pages.reduce(
          (acc: ILastMessageDTO[], page) => [...acc, ...page.results],
          [],
        ),
        onNextPage: handleNextPage,
        onRefresh: handleRefresh,
      }}
    >
      {children}
    </LastMessagesPresenterContext.Provider>
  )
}

export const withLastMessagesPresenter = (Component: React.FC) => {
  return (props: any) => (
    <LastMessagesPresenter>
      <Component {...props} />
    </LastMessagesPresenter>
  )
}

export const useLastMessagesPresenter = () =>
  useContext(LastMessagesPresenterContext)
