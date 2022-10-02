import { IDisciplineGroupMessage } from '@shared/entities'

import { IFilterParams, IPaginatedList } from '@/types/list'

import React, { useContext } from 'react'
import {
  useRecoilCallback,
  useRecoilState,
  useRecoilStateLoadable,
  useRecoilValueLoadable,
} from 'recoil'
import { FullLoading } from '@/components/FullLoading'
import {
  disciplineGroupMessagesFilterState,
  disciplineGroupMessagesState,
  getDisciplineGroupMessagesQuery,
  IGetDisciplineGroupMessagesQueryArgs,
} from '@/state/discipline-group-message'
import { useDisciplineGroupTabsPresenter } from '../DisciplineGroupTabsPresenter'
import { useEffect } from 'react'
import { useInfiniteQuery } from 'react-query'
import api from '@/api'

export interface DisciplineGroupChatPresenterContextData {
  loadingMessages: boolean
  disciplineGroupMessages: IPaginatedList<IDisciplineGroupMessage>
}

const DisciplineGroupChatPresenterContext = React.createContext(
  {} as DisciplineGroupChatPresenterContextData,
)

const initialFilter: IFilterParams = {
  page: 0,
  limit: 10,
}

export const DisciplineGroupChatPresenter: React.FC = ({ children }) => {
  const { disciplineGroup } = useDisciplineGroupTabsPresenter()

  const { isLoading, data } = useInfiniteQuery(
    'disciplineGroupMessages',
    async ({ pageParam = initialFilter }) => {
      return api.disciplineGroup.getDisciplineGroupMessages(disciplineGroup!.id, {
        page: pageParam.page,
        limit: pageParam.limit,
      })
    },
    {
      enabled: !!disciplineGroup?.id,
      keepPreviousData: true,
      getNextPageParam: (_, pages) => {
        return { ...initialFilter, page: pages.length }
      },
    },
  )

  if (isLoading) return <FullLoading />
  if (!data) return null

  return (
    <DisciplineGroupChatPresenterContext.Provider
      value={{
        loadingMessages: isLoading,

        disciplineGroupMessages: data.pages.reduce(
          (acc, page) => ({
            results: [...acc.results, ...page.results],
            total: Math.max(acc.total, page.total),
          }),
          { results: [], total: 0 },
        ),
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
