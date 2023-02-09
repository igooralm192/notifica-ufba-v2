import { IDisciplineGroupMemberDTO } from '@shared/dtos'

import { FullLoading } from '@/components/FullLoading'
import { useGetAllDisciplineGroupMembers } from '@/hooks/api'
import { IFilterParams } from '@/types/list'

import React, { useContext } from 'react'

import { useDisciplineGroupTabsPresenter } from '../DisciplineGroupTabsPresenter'

export interface DisciplineGroupMembersPresenterContextData {
  isFetchingMore: boolean
  isRefreshing: boolean
  disciplineGroupMembers: IDisciplineGroupMemberDTO[]
  onNextPage: () => void
  onRefresh: () => void
}

const DisciplineGroupMembersPresenterContext = React.createContext(
  {} as DisciplineGroupMembersPresenterContextData,
)

const initialFilter: IFilterParams = {
  page: 0,
  limit: 10,
}

export const DisciplineGroupMembersPresenter: React.FC = ({ children }) => {
  const { disciplineGroup } = useDisciplineGroupTabsPresenter()

  const {
    isLoading,
    isFetchingMore,
    isRefreshing,
    disciplineGroupMembers,
    fetchNextPage,
    hasNextPage,
    refresh,
  } = useGetAllDisciplineGroupMembers(
    { disciplineGroupId: disciplineGroup.id },
    initialFilter,
  )

  const handleNextPage = () => {
    if (!isFetchingMore && hasNextPage) fetchNextPage()
  }

  const handleRefresh = () => {
    refresh()
  }

  if (isLoading) return <FullLoading />

  return (
    <DisciplineGroupMembersPresenterContext.Provider
      value={{
        isFetchingMore,
        isRefreshing,
        disciplineGroupMembers: [
          { userId: '1', userName: 'Isaac Newton', userType: 'TEACHER' },
          { userId: '2', userName: 'Christian Elster', userType: 'STUDENT' },
          { userId: '3', userName: 'Igor de Almeida', userType: 'STUDENT' },
          { userId: '3', userName: 'Igor de Almeida', userType: 'STUDENT' },
          { userId: '3', userName: 'Igor de Almeida', userType: 'STUDENT' },
          { userId: '3', userName: 'Igor de Almeida', userType: 'STUDENT' },
          { userId: '3', userName: 'Igor de Almeida', userType: 'STUDENT' },
          { userId: '3', userName: 'Igor de Almeida', userType: 'STUDENT' },
          { userId: '3', userName: 'Igor de Almeida', userType: 'STUDENT' },
          { userId: '3', userName: 'Igor de Almeida', userType: 'STUDENT' },
          { userId: '3', userName: 'Igor de Almeida', userType: 'STUDENT' },
          { userId: '3', userName: 'Igor de Almeida', userType: 'STUDENT' },
          { userId: '3', userName: 'Igor de Almeida', userType: 'STUDENT' },
        ],
        onNextPage: handleNextPage,
        onRefresh: handleRefresh,
      }}
    >
      {children}
    </DisciplineGroupMembersPresenterContext.Provider>
  )
}

export const withDisciplineGroupMembersPresenter = (
  Component: React.FC<any>,
) => {
  return (props: any) => {
    return (
      <DisciplineGroupMembersPresenter>
        <Component {...props} />
      </DisciplineGroupMembersPresenter>
    )
  }
}

export const useDisciplineGroupMembersPresenter = () =>
  useContext(DisciplineGroupMembersPresenterContext)
