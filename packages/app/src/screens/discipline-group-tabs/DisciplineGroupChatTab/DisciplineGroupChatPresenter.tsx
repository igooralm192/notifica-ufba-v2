import { IDisciplineGroupMessage } from '@shared/entities'

import { FullLoading } from '@/components/FullLoading'
import { useMe } from '@/contexts/me'
import {
  useCreateDisciplineGroupMessage,
  useGetAllDisciplineGroupMessages,
} from '@/hooks/api'

import React, { useContext, useState } from 'react'

import { useDisciplineGroupTabsPresenter } from '../DisciplineGroupTabsPresenter'

export interface DisciplineGroupChatPresenterContextData {
  isFetchingMore: boolean
  disciplineGroupMessages: IDisciplineGroupMessage[]
  message: { text: string; onChange: (newMessage: string) => void }
  createMessage: () => Promise<void>
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
  const { user } = useMe()

  const { disciplineGroup, tabs } = useDisciplineGroupTabsPresenter()
  const { create: createMessage } = useCreateDisciplineGroupMessage()

  const {
    isLoading,
    isFetchingMore,
    disciplineGroupMessages,
    hasNextPage,
    fetchNextPage,
  } = useGetAllDisciplineGroupMessages(
    { disciplineGroupId: disciplineGroup.id },
    initialFilter,
    // TODO: Change to a named type
    tabs.currentIndex == 1,
  )

  const [message, setMessage] = useState('')

  const handleNextPage = () => {
    if (!isFetchingMore && hasNextPage) fetchNextPage()
  }

  const handleCreateMessage = async () => {
    const formattedMessage = message.trim()

    setMessage('')

    if (formattedMessage.length != 0) {
      createMessage({
        params: {
          disciplineGroupId: disciplineGroup.id,
          userId: user.id,
          userName: user.name,
        },
        body: { message: formattedMessage },
      })
    }
  }

  if (isLoading) return <FullLoading />

  return (
    <DisciplineGroupChatPresenterContext.Provider
      value={{
        isFetchingMore,
        disciplineGroupMessages,
        message: { text: message, onChange: setMessage },
        createMessage: handleCreateMessage,
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
