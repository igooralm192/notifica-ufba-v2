import { Button } from '@/components/Button'
import DropdownInput from '@/components/DropdownInput'
import { Input } from '@/components/Input'
import NumericInput from '@/components/NumericInput'
import { coursesList } from '@/utils/domain'

import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import React, { useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Keyboard, TextInput } from 'react-native'

import {
  useRegisterPresenter,
  withRegisterPresenter,
} from './RegisterPresenter'
import {
  Container,
  Logo,
  WelcomeText,
  InputContainer,
  ButtonContainer,
} from './RegisterStyles'

interface RegisterScreenProps {}

export interface IRegisterFormValues {
  name: string
  email: string
  matriculation: string
  course: string
  password: string
  confirmPassword: string
}

const registerSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(255)
    .pattern(/^[a-zA-Z\sÀ-ÿ]+$/)
    .required()
    .messages({
      'any.required': 'Campo obrigatório.',
      'string.empty': 'Campo obrigatório.',
      'string.min': 'Precisa ter no mínimo {{#limit}} caracteres.',
      'string.max': 'Precisa ter no máximo {{#limit}} caracteres.',
      'string.trim': 'Não pode haver espaços no início e no fim.',
      'string.pattern.base':
        'Não pode have números e certos caracteres especiais.',
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'any.required': `Campo obrigatório.`,
      'string.empty': 'Campo obrigatório.',
      'string.email': `E-mail inválido.`,
    }),
  matriculation: Joi.string().required().messages({
    'any.required': `Campo obrigatório.`,
    'string.empty': 'Campo obrigatório.',
  }),
  course: Joi.string().required().messages({
    'any.required': `Campo obrigatório.`,
    'string.empty': 'Campo obrigatório.',
  }),
  password: Joi.string().min(6).required().messages({
    'any.required': `Campo obrigatório.`,
    'string.empty': 'Campo obrigatório.',
    'string.min': `Senha precisa ter no mínimo 6 caracteres.`,
  }),
  confirmPassword: Joi.any().equal(Joi.ref('password')).required().messages({
    'any.only': 'As senhas não conferem.',
    'any.required': `Campo obrigatório.`,
    'string.empty': 'Campo obrigatório.',
  }),
})

const RegisterScreen: React.FC<RegisterScreenProps> = () => {
  const { isCreating, register } = useRegisterPresenter()

  const form = useForm<IRegisterFormValues>({
    mode: 'onChange',
    resolver: joiResolver(registerSchema),
  })

  const emailRef = useRef() as React.MutableRefObject<TextInput>
  const matriculationRef = useRef() as React.MutableRefObject<TextInput>
  const courseRef = useRef() as React.MutableRefObject<TextInput>
  const passwordRef = useRef() as React.MutableRefObject<TextInput>
  const confirmPasswordRef = useRef() as React.MutableRefObject<TextInput>

  const handleSubmit = async (values: IRegisterFormValues) => {
    Keyboard.dismiss()

    await register(values)
  }

  const submitForm = form.handleSubmit(handleSubmit)

  return (
    <Container>
      <Logo />

      <WelcomeText>
        Conheça nossa plataforma.{'\n'}
        Crie já sua conta!
      </WelcomeText>

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
              onSubmitEditing={() => emailRef?.current?.focus()}
              errorMessage={fieldState.error?.message}
              renderErrorMessage={!!fieldState.error}
              autoCapitalize="none"
              textContentType="name"
              testID="register-name-input"
            />
          )}
        />
      </InputContainer>

      <InputContainer>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Input
              ref={emailRef}
              placeholder="E-mail"
              leftIcon={{ name: 'email' }}
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              onSubmitEditing={() => matriculationRef?.current?.focus()}
              errorMessage={fieldState.error?.message}
              renderErrorMessage={!!fieldState.error}
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              testID="register-email-input"
            />
          )}
        />
      </InputContainer>

      <InputContainer>
        <Controller
          name="matriculation"
          control={form.control}
          render={({ field, fieldState }) => (
            <NumericInput
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
              maxLength={9}
              testID="register-matriculation-input"
            />
          )}
        />
      </InputContainer>

      <InputContainer>
        <Controller
          name="course"
          control={form.control}
          render={({ field, fieldState }) => (
            <DropdownInput
              ref={courseRef}
              placeholder="Curso"
              leftIcon={{ name: 'library-books' }}
              title="Selecione o seu curso"
              options={coursesList}
              value={field.value}
              onSelectOption={value => form.setValue('course', value)}
              onBlur={field.onBlur}
              onSubmitEditing={() => passwordRef?.current?.focus()}
              errorMessage={fieldState.error?.message}
              renderErrorMessage={!!fieldState.error}
              autoCapitalize="none"
              testID="register-course-input"
            />
          )}
        />
      </InputContainer>

      <InputContainer>
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Input
              ref={passwordRef}
              placeholder="Senha"
              leftIcon={{ name: 'lock' }}
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              onSubmitEditing={() => confirmPasswordRef?.current?.focus()}
              errorMessage={fieldState.error?.message}
              renderErrorMessage={!!fieldState.error}
              textContentType="password"
              secureTextEntry
              testID="register-password-input"
            />
          )}
        />
      </InputContainer>

      <InputContainer>
        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Input
              ref={confirmPasswordRef}
              placeholder="Confirmar senha"
              leftIcon={{ name: 'lock' }}
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              onSubmitEditing={submitForm}
              errorMessage={fieldState.error?.message}
              renderErrorMessage={!!fieldState.error}
              textContentType="password"
              secureTextEntry
              testID="register-confirm-password-input"
            />
          )}
        />
      </InputContainer>

      <ButtonContainer>
        <Button
          title="Cadastrar"
          loading={isCreating}
          disabled={isCreating || form.formState.isSubmitting}
          onPress={submitForm}
          loadingProps={{ testID: 'register-loading' }}
        />
      </ButtonContainer>
    </Container>
  )
}

export default withRegisterPresenter(RegisterScreen)
