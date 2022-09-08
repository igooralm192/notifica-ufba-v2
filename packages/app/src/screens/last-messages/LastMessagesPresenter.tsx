import { ILastMessageDTO } from '@notifica-ufba/domain/usecases'
import { BaseError } from '@/helpers'

import api from '@/api'
import { useDispatch, useSelector } from '@/store'
import { lastMessagesAdded, selectAllLastMessages } from '@/store/lastMessages'
import { IPaginatedList } from '@/types/list'

import React, { useContext, useState } from 'react'
import Toast from 'react-native-toast-message'

export interface LastMessagesPresenterContextData {
  loading: boolean
  lastMessages: IPaginatedList<ILastMessageDTO>
  getLastMessages(): Promise<void>
}

const LastMessagesPresenterContext = React.createContext(
  {} as LastMessagesPresenterContextData,
)

export const LastMessagesPresenter: React.FC = ({ children }) => {
  const dispatch = useDispatch()

  const lastMessages = useSelector(selectAllLastMessages)
  const lastMessagesTotal = useSelector(state => state.lastMessages.total)

  const [loading, setLoading] = useState(true)

  const getLastMessages = async (page = 0, limit = 10) => {
    setLoading(true)

    try {
      const lastMessages = await api.disciplineGroup.getMyLastMessages({
        page,
        limit,
      })

      dispatch(lastMessagesAdded(lastMessages))
    } catch (err) {
      const error = err as BaseError
      Toast.show({
        type: 'error',
        text1: 'Erro ao retornar as últimas mensagens.',
        text2: error.message,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <LastMessagesPresenterContext.Provider
      value={{
        loading,
        lastMessages: { results: lastMessages, total: lastMessagesTotal },
        getLastMessages,
      }}
    >
      {children}
    </LastMessagesPresenterContext.Provider>
  )
}

export const withLastMessagesPresenter = (Component: React.FC) => {
  return (props: any) => (
    <LastMessagesPresenter>
      <Component {...props} />
    </LastMessagesPresenter>
  )
}

export const useLastMessagesPresenter = () =>
  useContext(LastMessagesPresenterContext)
