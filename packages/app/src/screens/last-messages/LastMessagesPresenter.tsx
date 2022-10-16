import { ILastMessageDTO } from '@shared/dtos'

import { FullLoading } from '@/components/FullLoading'
import { useGetLastMessages } from '@/hooks/api'
import { IFilterParams } from '@/types/list'

import React, { useContext } from 'react'

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
    isFetchingMore,
    isRefreshing,
    lastMessages,
    fetchNextPage,
    hasNextPage,
    refresh,
  } = useGetLastMessages(initialFilter)

  const handleNextPage = () => {
    if (!isFetchingMore && hasNextPage) fetchNextPage()
  }

  const handleRefresh = () => {
    refresh()
  }

  if (isLoading) return <FullLoading />

  return (
    <LastMessagesPresenterContext.Provider
      value={{
        isFetchingMore,
        isRefreshing,
        lastMessages,
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
