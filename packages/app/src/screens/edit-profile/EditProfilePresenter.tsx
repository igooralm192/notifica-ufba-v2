import { IUser } from '@shared/entities'

import { IPatchMyStudentEndpoint } from '@/api/student/types'
import { useMe } from '@/contexts/me'
import { useUpdateMyStudent } from '@/hooks/api'

import React, { useContext } from 'react'
import Toast from 'react-native-toast-message'
import { useNavigation } from '@/helpers'

export interface EditProfilePresenterContextData {
  user: IUser
  updateStudent: (body: IPatchMyStudentEndpoint.Body) => Promise<void>
}

const EditProfilePresenterContext = React.createContext(
  {} as EditProfilePresenterContextData,
)

export const EditProfilePresenter: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { user } = useMe()
  const { update } = useUpdateMyStudent()

  const handleUpdateStudent = async (body: IPatchMyStudentEndpoint.Body) => {
    await update(body)

    Toast.show({
      type: 'success',
      text1: 'Perfil atualizado com sucesso!',
    })
  }

  if (!user) return null

  return (
    <EditProfilePresenterContext.Provider
      value={{ user, updateStudent: handleUpdateStudent }}
    >
      {children}
    </EditProfilePresenterContext.Provider>
  )
}

export const withEditProfilePresenter = (Component: React.FC) => {
  return (props: any) => (
    <EditProfilePresenter>
      <Component {...props} />
    </EditProfilePresenter>
  )
}

export const useEditProfilePresenter = () =>
  useContext(EditProfilePresenterContext)
