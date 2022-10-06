import { IDiscipline } from '@shared/entities'

import api from '@/api'
import { FullLoading } from '@/components/FullLoading'
import { BaseError } from '@/helpers'
import { IFilterParams } from '@/types/list'

import React, { useContext } from 'react'
import { useInfiniteQuery } from 'react-query'
import Toast from 'react-native-toast-message'

export interface DisciplinePresenterContextData {
  isFetchingMore: boolean
  isRefreshing: boolean
  disciplines: IDiscipline[]
  onNextPage: () => void
  onRefresh: () => void
}

const DisciplinePresenterContext = React.createContext(
  {} as DisciplinePresenterContextData,
)

const initialFilter: IFilterParams = {
  page: 0,
  limit: 10,
}

export const DisciplinePresenter: React.FC = ({ children }) => {
  const {
    isLoading,
    data,
    fetchNextPage,
    hasNextPage,
    refetch,
    isRefetching,
    isFetchingNextPage,
  } = useInfiniteQuery(
    'disciplines',
    async ({ pageParam = initialFilter }) => {
      return api.discipline.getDisciplines({
        page: pageParam.page,
        limit: pageParam.limit,
      })
    },
    {
      keepPreviousData: true,
      getNextPageParam: (lastPage, pages) => {
        const allResults = pages.reduce(
          (acc, page) => [...acc, ...page.results],
          [] as IDiscipline[],
        )

        if (allResults.length >= lastPage.total) return undefined

        return { ...initialFilter, page: pages.length }
      },
      onError: (error: BaseError) => {
        Toast.show({
          type: 'error',
          text1: `Erro ao retornar lista de disciplinas`,
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
    <DisciplinePresenterContext.Provider
      value={{
        isFetchingMore: isFetchingNextPage,
        isRefreshing: isRefetching,
        disciplines: data.pages.reduce(
          (acc: IDiscipline[], page) => [...acc, ...page.results],
          [],
        ),
        onNextPage: handleNextPage,
        onRefresh: handleRefresh,
      }}
    >
      {children}
    </DisciplinePresenterContext.Provider>
  )
}

export const withDisciplinePresenter = (Component: React.FC) => {
  return (props: any) => (
    <DisciplinePresenter>
      <Component {...props} />
    </DisciplinePresenter>
  )
}

export const useDisciplinePresenter = () =>
  useContext(DisciplinePresenterContext)
