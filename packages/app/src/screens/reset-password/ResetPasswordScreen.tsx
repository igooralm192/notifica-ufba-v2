import { Button } from '@/components/Button'
import { Input } from '@/components/Input'

import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import React from 'react'
import { useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Keyboard, TextInput } from 'react-native'
import {
  useResetPasswordPresenter,
  withResetPasswordPresenter,
} from './ResetPasswordPresenter'
import {
  Container,
  Logo,
  ResetPasswordText,
  InputContainer,
  ButtonContainer,
} from './ResetPasswordStyles'

interface ResetPasswordScreenProps {}

export interface IResetPasswordFormValues {
  password: string
  confirmPassword: string
}

const resetPasswordSchema = Joi.object({
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

const ResetPasswordScreen: React.FC<ResetPasswordScreenProps> = () => {
  const { isResetting, resetPassword } = useResetPasswordPresenter()

  const form = useForm<IResetPasswordFormValues>({
    mode: 'onChange',
    resolver: joiResolver(resetPasswordSchema),
  })

  const confirmPasswordRef = useRef() as React.MutableRefObject<TextInput>

  const handleSubmit = async ({ password }: IResetPasswordFormValues) => {
    try {
      Keyboard.dismiss()

      await resetPassword(password)
    } catch {}
  }

  const submitForm = form.handleSubmit(handleSubmit)

  return (
    <Container>
      <Logo />

      <ResetPasswordText>
        Digite sua nova senha abaixo.
      </ResetPasswordText>

      <InputContainer>
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Input
              placeholder="Senha"
              leftIcon={{ name: 'lock' }}
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              onSubmitEditing={submitForm}
              errorMessage={fieldState.error?.message}
              renderErrorMessage={!!fieldState.error}
              textContentType="password"
              secureTextEntry
              testID="reset-password-input"
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
              testID="reset-confirm-password-input"
            />
          )}
        />
      </InputContainer>

      <ButtonContainer>
        <Button
          title="Enviar"
          loading={isResetting}
          disabled={isResetting || form.formState.isSubmitting}
          onPress={submitForm}
          loadingProps={{ testID: 'reset-password-loading' }}
        />
      </ButtonContainer>
    </Container>
  )
}

export default withResetPasswordPresenter(ResetPasswordScreen)
