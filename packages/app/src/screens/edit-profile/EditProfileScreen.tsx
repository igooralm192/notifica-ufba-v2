import { useStatusBar } from '@/contexts/status-bar'
import {
  EditProfileStudentForm,
  IEditProfileStudentFormValues,
} from '@/screens/edit-profile/EditProfileStudentForm'

import React from 'react'

import {
  useEditProfilePresenter,
  withEditProfilePresenter,
} from './EditProfilePresenter'
import { Container } from './EditProfileStyles'

export interface EditProfileScreenProps {}

const EditProfileScreen: React.FC<EditProfileScreenProps> = () => {
  const { user, updateStudent } = useEditProfilePresenter()

  useStatusBar('primary')

  const handleStudentSubmit = async (data: IEditProfileStudentFormValues) => {
    await updateStudent(data)
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
      ) : null}
    </Container>
  )
}

export default withEditProfilePresenter(EditProfileScreen)
