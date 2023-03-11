import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import * as Validations from '@/validations'

import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Keyboard } from 'react-native'

import { Container, InputContainer, ButtonContainer } from './styles'

export interface EditProfileTeacherFormProps {
  initialValues: Partial<IEditProfileTeacherFormValues>
  onSubmit: (data: IEditProfileTeacherFormValues) => Promise<void>
}

export interface IEditProfileTeacherFormValues {
  name: string
}

const editProfileTeacherSchema = Joi.object({
  name: Validations.name.required()
})

export const EditProfileTeacherForm: React.FC<EditProfileTeacherFormProps> = ({
  initialValues,
  onSubmit,
}) => {
  const form = useForm<IEditProfileTeacherFormValues>({
    mode: 'onChange',
    resolver: joiResolver(editProfileTeacherSchema),
    defaultValues: initialValues,
  })

  const handleSubmit = async (values: IEditProfileTeacherFormValues) => {
    try {
      Keyboard.dismiss()

      await onSubmit(values)
    } catch (error) {}
  }

  const submitForm = form.handleSubmit(handleSubmit)

  return (
    <Container>
      <InputContainer>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Input
              placeholder="Nome"
              leftIcon={{ name: 'person' }}
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              onSubmitEditing={submitForm}
              errorMessage={fieldState.error?.message}
              renderErrorMessage={!!fieldState.error}
              autoCapitalize="none"
              textContentType="name"
              testID="edit-profile-teacher-name-input"
            />
          )}
        />
      </InputContainer>

      <ButtonContainer>
        <Button
          title="Salvar"
          loading={form.formState.isSubmitting}
          disabled={form.formState.isSubmitting}
          onPress={submitForm}
          // loadingProps={{ testID: 'register-loading' }}
        />
      </ButtonContainer>
    </Container>
  )
}
