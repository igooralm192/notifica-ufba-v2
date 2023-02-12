import { IDisciplineGroupMemberDTO } from '@shared/dtos'

import { FullLoading } from '@/components/FullLoading'
import {
  useGetAllDisciplineGroupMembers,
  useRemoveDisciplineGroupStudent,
} from '@/hooks/api'

import React, { useContext } from 'react'

import { useDisciplineGroupTabsPresenter } from '../DisciplineGroupTabsPresenter'

export interface DisciplineGroupMembersPresenterContextData {
  isRefreshing: boolean
  disciplineGroupMembers: IDisciplineGroupMemberDTO[]
  onRefresh: () => void

  removeStudent: {
    loading: boolean
    remove: (studentId: string) => Promise<void>
  }
}

const DisciplineGroupMembersPresenterContext = React.createContext(
  {} as DisciplineGroupMembersPresenterContextData,
)

export const DisciplineGroupMembersPresenter: React.FC = ({ children }) => {
  const { disciplineGroup } = useDisciplineGroupTabsPresenter()

  const { isLoading, isRefreshing, disciplineGroupMembers, refresh } =
    useGetAllDisciplineGroupMembers({ disciplineGroupId: disciplineGroup.id })

  const { isRemoving, remove: removeStudent } =
    useRemoveDisciplineGroupStudent()

  const handleRefresh = () => {
    refresh()
  }

  const handleRemoveStudent = async (studentId: string) => {
    await removeStudent({
      params: { disciplineGroupId: disciplineGroup.id, studentId },
    })
  }

  if (isLoading) return <FullLoading />

  return (
    <DisciplineGroupMembersPresenterContext.Provider
      value={{
        isRefreshing,
        disciplineGroupMembers,
        onRefresh: handleRefresh,
        removeStudent: {
          loading: isRemoving,
          remove: handleRemoveStudent
        }
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
