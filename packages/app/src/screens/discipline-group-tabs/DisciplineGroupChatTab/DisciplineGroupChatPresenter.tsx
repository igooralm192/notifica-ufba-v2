import { IDisciplineGroupMessage } from '@shared/entities'

import { IPaginatedList } from '@/types/list'

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

export interface DisciplineGroupChatPresenterContextData {
  loadingMessages: boolean
  disciplineGroupMessages: IPaginatedList<IDisciplineGroupMessage>
}

const DisciplineGroupChatPresenterContext = React.createContext(
  {} as DisciplineGroupChatPresenterContextData,
)

export const DisciplineGroupChatPresenter: React.FC = ({ children }) => {
  const { disciplineGroup } = useDisciplineGroupTabsPresenter()

  const [filter, setFilter] = useRecoilState(disciplineGroupMessagesFilterState)

  const loadingDisciplineGroupMessages =
    useRecoilValueLoadable(
      getDisciplineGroupMessagesQuery({
        disciplineGroupId: disciplineGroup?.id,
        filterParams: filter,
      }),
    ).state === 'loading'

  const [disciplineGroupMessagesLoadable, setDisciplineGroupMessages] =
    useRecoilStateLoadable(disciplineGroupMessagesState)

  const getDisciplineGroupMessages = useRecoilCallback(
    ({ snapshot }) =>
      async ({
        disciplineGroupId,
        filterParams,
      }: IGetDisciplineGroupMessagesQueryArgs) => {
        const disciplineGroupMessages = await snapshot.getPromise(
          getDisciplineGroupMessagesQuery({ disciplineGroupId, filterParams }),
        )

        if (filterParams.page === 0)
          setDisciplineGroupMessages(disciplineGroupMessages)
        else
          setDisciplineGroupMessages(currentDisciplineGroupMessages => ({
            results: [
              ...currentDisciplineGroupMessages.results,
              ...disciplineGroupMessages.results,
            ],
            total: disciplineGroupMessages.total,
          }))
      },
    [],
  )

  useEffect(() => {
    getDisciplineGroupMessages({
      disciplineGroupId: disciplineGroup?.id,
      filterParams: filter,
    })
  }, [filter])

  if (disciplineGroupMessagesLoadable.state === 'loading')
    return <FullLoading />

  return (
    <DisciplineGroupChatPresenterContext.Provider
      value={{
        loadingMessages: loadingDisciplineGroupMessages,

        disciplineGroupMessages: disciplineGroupMessagesLoadable.getValue(),
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
