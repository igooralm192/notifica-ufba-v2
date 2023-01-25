import { useStatusBar } from '@/contexts/status-bar'
import {
  EditProfileStudentForm,
  IEditProfileStudentFormValues,
} from '@/screens/edit-profile/EditProfileStudentForm'
import {
  EditProfileTeacherForm,
  IEditProfileTeacherFormValues,
} from '@/screens/edit-profile/EditProfileTeacherForm'

import React from 'react'

import {
  useEditProfilePresenter,
  withEditProfilePresenter,
} from './EditProfilePresenter'
import { Container } from './EditProfileStyles'

export interface EditProfileScreenProps {}

const EditProfileScreen: React.FC<EditProfileScreenProps> = () => {
  const { user, updateStudent, updateTeacher } = useEditProfilePresenter()

  useStatusBar('primary')

  const handleStudentSubmit = async (data: IEditProfileStudentFormValues) => {
    await updateStudent(data)
  }

  const handleTeacherSubmit = async (data: IEditProfileTeacherFormValues) => {
    await updateTeacher(data)
  }

  return (
    <Container headerProps={{ title: 'Editar Perfil' }}>
      {user.type === 'STUDENT' ? (
        <EditProfileStudentForm
          initialValues={{
            name: user.name,
            matriculation: user.student!.matriculation,
            course: user.student!.course,
          }}
          onSubmit={handleStudentSubmit}
        />
      ) : (
        <EditProfileTeacherForm
          initialValues={{
            name: user.name,
          }}
          onSubmit={handleTeacherSubmit}
        />
      )}
    </Container>
  )
}

export default withEditProfilePresenter(EditProfileScreen)
