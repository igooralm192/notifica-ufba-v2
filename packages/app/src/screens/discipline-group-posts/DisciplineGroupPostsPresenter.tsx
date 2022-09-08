import { IDisciplineGroup } from '@shared/entities'
import { BaseError } from '@/helpers'

import api from '@/api'
import { useAuth } from '@/contexts/auth'

import React, { useContext, useState } from 'react'
import Toast from 'react-native-toast-message'
import { StackScreenProps } from '@react-navigation/stack'
import { AppNavigation } from '@/types/navigation'

export interface DisciplineGroupPostsPresenterContextData {
  fetching: boolean
  disciplineGroup: IDisciplineGroup | undefined
  getDisciplineGroupById(): Promise<void>
}

const DisciplineGroupPostsPresenterContext = React.createContext(
  {} as DisciplineGroupPostsPresenterContextData,
)

export const DisciplineGroupPostsPresenter: React.FC<{
  disciplineGroupId: string
}> = ({ disciplineGroupId, children }) => {
  const auth = useAuth()

  const [fetching, setFetching] = useState(false)

  const [disciplineGroup, setDisciplineGroup] = useState<IDisciplineGroup>()

  const getDisciplineGroupById = async () => {}

  const subscribeStudent = async (disciplineGroup: IDisciplineGroup) => {
    if (!auth.user || !auth.user.student) return

    setFetching(true)

    try {
      await api.disciplineGroup.subscribeStudent({
        disciplineGroupId: disciplineGroup.id,
        studentId: auth.user.student.id,
      })

      disciplineGroup.studentIds?.push(auth.user.student.id)
    } catch (err) {
      const error = err as BaseError

      Toast.show({
        type: 'error',
        text1: 'Erro ao inscrever estudante.',
        text2: error.message,
      })
    } finally {
      setFetching(false)
    }
  }

  return (
    <DisciplineGroupPostsPresenterContext.Provider
      value={{
        fetching,
        disciplineGroup,
        getDisciplineGroupById,
      }}
    >
      {children}
    </DisciplineGroupPostsPresenterContext.Provider>
  )
}

export const withDisciplineGroupPostsPresenter = (Component: React.FC<any>) => {
  return ({
    route,
    ...props
  }: StackScreenProps<AppNavigation, 'DisciplineGroupPostsScreen'>) => {
    const { disciplineGroupId } = route.params

    return (
      <DisciplineGroupPostsPresenter disciplineGroupId={disciplineGroupId}>
        <Component {...props} />
      </DisciplineGroupPostsPresenter>
    )
  }
}

export const useDisciplineGroupPostsPresenter = () =>
  useContext(DisciplineGroupPostsPresenterContext)
