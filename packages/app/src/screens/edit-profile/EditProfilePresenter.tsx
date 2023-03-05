import { IUser } from '@shared/entities'

import { IPatchMyStudentEndpoint } from '@/api/student/types'
import { IPatchMyTeacherEndpoint } from '@/api/teacher/types'
import { useMe } from '@/contexts/me'
import { useUpdateMyStudent, useUpdateMyTeacher } from '@/hooks/api'

import React, { useContext } from 'react'
import Toast from 'react-native-toast-message'

export interface EditProfilePresenterContextData {
  user: IUser
  updateStudent: (body: IPatchMyStudentEndpoint.Body) => Promise<void>
  updateTeacher: (body: IPatchMyTeacherEndpoint.Body) => Promise<void>
}

const EditProfilePresenterContext = React.createContext(
  {} as EditProfilePresenterContextData,
)

export const EditProfilePresenter: React.FC = ({ children }) => {
  const { user } = useMe()

  const { update: updateStudent } = useUpdateMyStudent()
  const { update: updateTeacher } = useUpdateMyTeacher()

  const handleUpdateStudent = async (body: IPatchMyStudentEndpoint.Body) => {
    await updateStudent(body)
  }

  const handleUpdateTeacher = async (body: IPatchMyTeacherEndpoint.Body) => {
    await updateTeacher(body)
  }

  if (!user) return null

  return (
    <EditProfilePresenterContext.Provider
      value={{
        user,
        updateStudent: handleUpdateStudent,
        updateTeacher: handleUpdateTeacher,
      }}
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
