import { Button } from '@/components/Button'
import { Input } from '@/components/Input'

import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Keyboard } from 'react-native'

import {
  useForgotPasswordPresenter,
  withForgotPasswordPresenter,
} from './ForgotPasswordPresenter'
import {
  Container,
  Logo,
  ForgotPasswordText,
  InputContainer,
  ButtonContainer,
} from './ForgotPasswordStyles'

interface ForgotPasswordScreenProps {}

export interface IForgotPasswordFormValues {
  email: string
  password: string
}

const forgotPasswordSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'any.required': `Campo obrigatório.`,
      'string.empty': 'Campo obrigatório.',
      'string.email': `E-mail inválido.`,
    }),
})

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = () => {
  const { isForgotting, forgotPassword } = useForgotPasswordPresenter()

  const form = useForm<IForgotPasswordFormValues>({
    mode: 'onChange',
    resolver: joiResolver(forgotPasswordSchema),
  })

  const handleSubmit = async (values: IForgotPasswordFormValues) => {
    try {
      Keyboard.dismiss()

      await forgotPassword(values)
    } catch {}
  }

  const submitForm = form.handleSubmit(handleSubmit)

  return (
    <Container>
      <Logo />

      <ForgotPasswordText>
        Esqueceu a sua senha?{'\n'}Digite o seu e-mail abaixo para te enviarmos
        um link para sua troca de senha!
      </ForgotPasswordText>

      <InputContainer>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Input
              placeholder="E-mail"
              leftIcon={{ name: 'email' }}
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              onSubmitEditing={submitForm}
              errorMessage={fieldState.error?.message}
              renderErrorMessage={!!fieldState.error}
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              testID="forgot-password-email-input"
            />
          )}
        />
      </InputContainer>

      <ButtonContainer>
        <Button
          title="Enviar"
          loading={isForgotting}
          disabled={isForgotting || form.formState.isSubmitting}
          onPress={submitForm}
          loadingProps={{ testID: 'forgot-password-loading' }}
        />
      </ButtonContainer>
    </Container>
  )
}

export default withForgotPasswordPresenter(ForgotPasswordScreen)
