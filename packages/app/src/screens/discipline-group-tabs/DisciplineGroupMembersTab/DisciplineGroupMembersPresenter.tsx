import { IDisciplineGroupMemberDTO } from '@shared/dtos'

import { FullLoading } from '@/components/FullLoading'
import { useGetAllDisciplineGroupMembers } from '@/hooks/api'

import React, { useContext } from 'react'

import { useDisciplineGroupTabsPresenter } from '../DisciplineGroupTabsPresenter'

export interface DisciplineGroupMembersPresenterContextData {
  isRefreshing: boolean
  disciplineGroupMembers: IDisciplineGroupMemberDTO[]
  onRefresh: () => void
}

const DisciplineGroupMembersPresenterContext = React.createContext(
  {} as DisciplineGroupMembersPresenterContextData,
)

export const DisciplineGroupMembersPresenter: React.FC = ({ children }) => {
  const { disciplineGroup } = useDisciplineGroupTabsPresenter()

  const { isLoading, isRefreshing, disciplineGroupMembers, refresh } =
    useGetAllDisciplineGroupMembers({ disciplineGroupId: disciplineGroup.id })

  const handleRefresh = () => {
    refresh()
  }

  if (isLoading) return <FullLoading />

  return (
    <DisciplineGroupMembersPresenterContext.Provider
      value={{
        isRefreshing,
        disciplineGroupMembers,
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
