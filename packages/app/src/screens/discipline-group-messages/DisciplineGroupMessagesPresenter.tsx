import { IDisciplineGroupMessage } from '@shared/entities'

import { DisciplineGroupMessageMapper } from '@/mappers'
import { IPaginatedList } from '@/types/list'
import { AppNavigation } from '@/types/navigation'

import { StackScreenProps } from '@react-navigation/stack'
import {
  collection,
  doc,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import Toast from 'react-native-toast-message'
import { db } from '@/config/firebase'

export interface DisciplineGroupMessagesPresenterContextData {
  disciplineGroupId: string
  loading: boolean
  disciplineGroupMessages: IPaginatedList<IDisciplineGroupMessage>
}

const DisciplineGroupMessagesPresenterContext = React.createContext(
  {} as DisciplineGroupMessagesPresenterContextData,
)

export const DisciplineGroupMessagesPresenter: React.FC<{
  disciplineGroupId: string
}> = ({ disciplineGroupId, children }) => {
  const [loading, setLoading] = useState(true)

  const [disciplineGroupMessages, setDisciplineGroupMessages] = useState<
    IPaginatedList<IDisciplineGroupMessage>
  >({
    results: [],
    total: 0,
  })

  const handleNewMessages = async (
    disciplineGroupMessages: IDisciplineGroupMessage[],
  ) => {
    setDisciplineGroupMessages({
      results: disciplineGroupMessages,
      total: disciplineGroupMessages.length,
    })
  }

  useEffect(() => {
    const docRef = doc(db, 'disciplineGroupMessages', disciplineGroupId)
    const collectionRef = collection(docRef, 'messages')
    const queryRef = query(collectionRef, orderBy('sentAt', 'desc'))

    const unsubscribe = onSnapshot(
      queryRef,
      snapshot => {
        handleNewMessages(
          DisciplineGroupMessageMapper.toEntityList(
            snapshot.docs.map(doc => doc.data()),
          ),
        )

        setLoading(false)
      },
      error => {
        Toast.show({
          type: 'error',
          text1: 'Erro ao retornar as mensagens desta disciplina.',
          text2: error.message,
        })
      },
    )

    return () => unsubscribe()
  }, [])

  return (
    <DisciplineGroupMessagesPresenterContext.Provider
      value={{
        disciplineGroupId,
        loading,
        disciplineGroupMessages,
      }}
    >
      {children}
    </DisciplineGroupMessagesPresenterContext.Provider>
  )
}

export const withDisciplineGroupMessagesPresenter = (
  Component: React.FC<any>,
) => {
  return ({
    route,
    ...props
  }: StackScreenProps<AppNavigation, 'DisciplineGroupMessagesScreen'>) => {
    const { disciplineGroupId } = route.params

    return (
      <DisciplineGroupMessagesPresenter disciplineGroupId={disciplineGroupId}>
        <Component {...props} />
      </DisciplineGroupMessagesPresenter>
    )
  }
}

export const useDisciplineGroupMessagesPresenter = () =>
  useContext(DisciplineGroupMessagesPresenterContext)
