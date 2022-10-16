import { IDiscipline } from '@shared/entities'

import { FullLoading } from '@/components/FullLoading'
import { useGetAllDisciplines } from '@/hooks/api'
import { IFilterParams } from '@/types/list'

import React, { useContext } from 'react'

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
    isFetchingMore,
    isRefreshing,
    disciplines,
    hasNextPage,
    fetchNextPage,
    refresh,
  } = useGetAllDisciplines(initialFilter)

  const handleNextPage = () => {
    if (!isFetchingMore && hasNextPage) fetchNextPage()
  }

  const handleRefresh = () => {
    refresh()
  }

  if (isLoading) return <FullLoading />

  return (
    <DisciplinePresenterContext.Provider
      value={{
        isFetchingMore,
        isRefreshing,
        disciplines,
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
