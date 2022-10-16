import { IDisciplineGroupMessage } from '@shared/entities'

import { FullLoading } from '@/components/FullLoading'
import { useGetAllDisciplineGroupMessages } from '@/hooks/api'

import React, { useContext } from 'react'

import { useDisciplineGroupTabsPresenter } from '../DisciplineGroupTabsPresenter'

export interface DisciplineGroupChatPresenterContextData {
  isFetchingMore: boolean
  disciplineGroupMessages: IDisciplineGroupMessage[]
  onNextPage: () => void
}

type IChatFilterParams = {
  limit?: number
}

const DisciplineGroupChatPresenterContext = React.createContext(
  {} as DisciplineGroupChatPresenterContextData,
)

const initialFilter: IChatFilterParams = {
  limit: 20,
}

export const DisciplineGroupChatPresenter: React.FC = ({ children }) => {
  const { disciplineGroup } = useDisciplineGroupTabsPresenter()

  const {
    isLoading,
    isFetchingMore,
    disciplineGroupMessages,
    hasNextPage,
    fetchNextPage,
  } = useGetAllDisciplineGroupMessages(
    { disciplineGroupId: disciplineGroup.id },
    initialFilter,
  )

  const handleNextPage = () => {
    if (!isFetchingMore && hasNextPage) fetchNextPage()
  }

  if (isLoading) return <FullLoading />

  return (
    <DisciplineGroupChatPresenterContext.Provider
      value={{
        isFetchingMore,
        disciplineGroupMessages,
        onNextPage: handleNextPage,
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
