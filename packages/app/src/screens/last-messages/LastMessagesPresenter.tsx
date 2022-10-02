import { ILastMessageDTO } from '@shared/dtos'
import { BaseError } from '@/helpers'

import api from '@/api'
import { useDispatch, useSelector } from '@/store'
import { lastMessagesAdded, selectAllLastMessages } from '@/store/lastMessages'
import { IFilterParams, IPaginatedList } from '@/types/list'

import React, { useContext, useState } from 'react'
import Toast from 'react-native-toast-message'
import { useInfiniteQuery } from 'react-query'
import { FullLoading } from '@/components/FullLoading'

export interface LastMessagesPresenterContextData {
  loading: boolean
  lastMessages: IPaginatedList<ILastMessageDTO>
}

const LastMessagesPresenterContext = React.createContext(
  {} as LastMessagesPresenterContextData,
)

const initialFilter: IFilterParams = {
  page: 0,
  limit: 10,
}

export const LastMessagesPresenter: React.FC = ({ children }) => {
  const { isLoading, isFetching, data } = useInfiniteQuery(
    'lastMessages',
    async ({ pageParam = initialFilter }) => {
      return api.disciplineGroup.getMyLastMessages({
        page: pageParam.page,
        limit: pageParam.limit,
      })
    },
    {
      keepPreviousData: true,
      getNextPageParam: (_, pages) => {
        return { ...initialFilter, page: pages.length }
      },
    },
  )

  if (isLoading) return <FullLoading />
  if (!data) return null

  return (
    <LastMessagesPresenterContext.Provider
      value={{
        loading: isFetching,
        lastMessages: data.pages.reduce(
          (acc, page) => ({
            results: [...acc.results, ...page.results],
            total: Math.max(acc.total, page.total),
          }),
          { results: [], total: 0 },
        ),
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
