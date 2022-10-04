import { IDisciplineGroup } from '@shared/entities'

import api from '@/api'
import { FullLoading } from '@/components/FullLoading'
import { useMe } from '@/contexts/me'
import { BaseError } from '@/helpers'
import { IFilterParams } from '@/types/list'

import React, { useContext } from 'react'
import { useInfiniteQuery } from 'react-query'
import Toast from 'react-native-toast-message'

export interface DisciplineGroupsPresenterContextData {
  isFetchingMore: boolean
  isRefreshing: boolean
  disciplineGroups: IDisciplineGroup[]
  onNextPage: () => void
  onRefresh: () => void
}

const DisciplineGroupsPresenterContext = React.createContext(
  {} as DisciplineGroupsPresenterContextData,
)

const initialFilter: IFilterParams = {
  page: 0,
  limit: 10,
}

export const DisciplineGroupsPresenter: React.FC = ({ children }) => {
  const { user } = useMe()

  const {
    isLoading,
    data,
    fetchNextPage,
    hasNextPage,
    refetch,
    isRefetching,
    isFetchingNextPage,
  } = useInfiniteQuery(
    'disciplineGroups',
    async ({ pageParam = initialFilter }) => {
      return api.disciplineGroup.getDisciplineGroups({
        query: { studentId: user?.student?.id },
        page: pageParam.page,
        limit: pageParam.limit,
      })
    },
    {
      enabled: !!user?.student?.id,
      keepPreviousData: true,
      getNextPageParam: (lastPage, pages) => {
        const allResults = pages.reduce(
          (acc, page) => [...acc, ...page.results],
          [] as IDisciplineGroup[],
        )

        if (allResults.length >= lastPage.total) return undefined

        return { ...initialFilter, page: pages.length }
      },
      onError: (error: BaseError) => {
        Toast.show({
          type: 'error',
          text1: `Erro ao retornar lista de turmas`,
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
    <DisciplineGroupsPresenterContext.Provider
      value={{
        isFetchingMore: isFetchingNextPage,
        isRefreshing: isRefetching,
        disciplineGroups: data.pages.reduce(
          (acc: IDisciplineGroup[], page) => [...acc, ...page.results],
          [],
        ),
        onNextPage: handleNextPage,
        onRefresh: handleRefresh,
      }}
    >
      {children}
    </DisciplineGroupsPresenterContext.Provider>
  )
}

export const withDisciplineGroupsPresenter = (Component: React.FC) => {
  return (props: any) => (
    <DisciplineGroupsPresenter>
      <Component {...props} />
    </DisciplineGroupsPresenter>
  )
}

export const useDisciplineGroupsPresenter = () =>
  useContext(DisciplineGroupsPresenterContext)
