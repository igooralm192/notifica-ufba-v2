import { Button } from '@/components/Button'
import { Input } from '@/components/Input'

import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import React, { useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Keyboard, TextInput } from 'react-native'

import { Container, InputContainer, ButtonContainer } from './styles'

export interface EditProfileStudentFormProps extends React.PropsWithChildren {
  initialValues: Partial<IEditProfileStudentFormValues>
  onSubmit: (data: IEditProfileStudentFormValues) => Promise<void>
}

export interface IEditProfileStudentFormValues {
  name: string
  matriculation: string
  course: string
}

const editProfileStudentSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': `Campo obrigatório.`,
    'string.empty': 'Campo obrigatório.',
  }),
  matriculation: Joi.string().required().messages({
    'any.required': `Campo obrigatório.`,
    'string.empty': 'Campo obrigatório.',
  }),
  course: Joi.string().required().messages({
    'any.required': `Campo obrigatório.`,
    'string.empty': 'Campo obrigatório.',
  }),
})

export const EditProfileStudentForm: React.FC<EditProfileStudentFormProps> = ({
  initialValues,
  onSubmit,
}) => {
  const form = useForm<IEditProfileStudentFormValues>({
    mode: 'onChange',
    resolver: joiResolver(editProfileStudentSchema),
    defaultValues: initialValues
  })

  const matriculationRef = useRef() as React.MutableRefObject<TextInput>
  const courseRef = useRef() as React.MutableRefObject<TextInput>

  const handleSubmit = async (values: IEditProfileStudentFormValues) => {
    Keyboard.dismiss()

    await onSubmit(values)
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
              onSubmitEditing={() => matriculationRef?.current?.focus()}
              errorMessage={fieldState.error?.message}
              renderErrorMessage={!!fieldState.error}
              autoCapitalize="none"
              textContentType="name"
              testID="edit-profile-student-name-input"
            />
          )}
        />
      </InputContainer>

      <InputContainer>
        <Controller
          name="matriculation"
          control={form.control}
          render={({ field, fieldState }) => (
            <Input
              ref={matriculationRef}
              placeholder="Matrícula"
              leftIcon={{ name: 'app-registration' }}
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              onSubmitEditing={() => courseRef?.current?.focus()}
              errorMessage={fieldState.error?.message}
              renderErrorMessage={!!fieldState.error}
              autoCapitalize="none"
              testID="edit-profile-student-matriculation-input"
            />
          )}
        />
      </InputContainer>

      <InputContainer>
        <Controller
          name="course"
          control={form.control}
          render={({ field, fieldState }) => (
            <Input
              ref={courseRef}
              placeholder="Curso"
              leftIcon={{ name: 'library-books' }}
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              onSubmitEditing={submitForm}
              errorMessage={fieldState.error?.message}
              renderErrorMessage={!!fieldState.error}
              autoCapitalize="none"
              testID="edit-profile-student-course-input"
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
          loadingProps={{ testID: 'register-loading' }}
        />
      </ButtonContainer>
    </Container>
  )
}
