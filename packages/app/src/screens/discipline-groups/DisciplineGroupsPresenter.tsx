import { IDisciplineGroup } from '@shared/entities'

import { FullLoading } from '@/components/FullLoading'
import { useMe } from '@/contexts/me'
import { useGetAllDisciplineGroups, useUnsubscribeStudent } from '@/hooks/api'
import { IFilterParams } from '@/types/list'

import React, { useContext } from 'react'

export interface DisciplineGroupsPresenterContextData {
  isFetchingMore: boolean
  isRefreshing: boolean
  isUnsubscribing: boolean
  disciplineGroups: IDisciplineGroup[]
  unsubscribeStudent: (disciplineGroupId: string) => Promise<void>
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
    isFetchingMore,
    isRefreshing,
    disciplineGroups,
    fetchNextPage,
    hasNextPage,
    refresh,
  } = useGetAllDisciplineGroups({
    ...initialFilter,
    studentId: user?.student?.id,
    teacherId: user?.teacher?.id,
  })

  const { isUnsubscribing, unsubscribe } = useUnsubscribeStudent()

  const handleNextPage = () => {
    if (!isFetchingMore && hasNextPage) fetchNextPage()
  }

  const handleRefresh = () => {
    refresh()
  }

  const handleUnsubscribeStudent = async (disciplineGroupId: string) => {
    await unsubscribe({ disciplineGroupId })
  }

  if (isLoading) return <FullLoading />

  return (
    <DisciplineGroupsPresenterContext.Provider
      value={{
        isFetchingMore,
        isRefreshing,
        isUnsubscribing,
        disciplineGroups,
        unsubscribeStudent: handleUnsubscribeStudent,
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
