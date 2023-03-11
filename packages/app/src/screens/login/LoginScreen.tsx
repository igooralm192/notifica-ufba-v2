import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Log } from '@/config/logger'
import { useNavigation } from '@/helpers'
import * as Validations from '@/validations'

import { joiResolver } from '@hookform/resolvers/joi'
import * as SentryNative from '@sentry/react-native'
import Joi from 'joi'
import React, { useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Keyboard, TextInput } from 'react-native'

import { useLoginPresenter, withLoginPresenter } from './LoginPresenter'
import {
  Container,
  Logo,
  WelcomeText,
  InputContainer,
  ButtonContainer,
  ForgotPasswordLink,
} from './LoginStyles'

interface LoginScreenProps {}

export interface ILoginFormValues {
  email: string
  password: string
}

const loginSchema = Joi.object({
  email: Validations.email.required(),
  password: Validations.password.required()
})

const LoginScreen: React.FC<LoginScreenProps> = () => {
  const { isLoggingIn, login } = useLoginPresenter()

  const navigation = useNavigation()

  const form = useForm<ILoginFormValues>({
    mode: 'onChange',
    resolver: joiResolver(loginSchema),
  })

  const passwordRef = useRef() as React.MutableRefObject<TextInput>

  const handleSubmit = async (values: ILoginFormValues) => {
    try {
      Keyboard.dismiss()

      await login(values)
    } catch (error: any) {
      Log.error('Login', {error})
      SentryNative.captureException(error)
    }
  }

  const submitForm = form.handleSubmit(handleSubmit)

  return (
    <Container>
      <Logo />

      <WelcomeText>
        Bem vindo de volta.{'\n'}Faça login na sua conta!
      </WelcomeText>

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
              onSubmitEditing={() => passwordRef?.current?.focus()}
              errorMessage={fieldState.error?.message}
              renderErrorMessage={!!fieldState.error}
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              testID="login-email-input"
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
              onSubmitEditing={submitForm}
              errorMessage={fieldState.error?.message}
              renderErrorMessage={!!fieldState.error}
              textContentType="password"
              secureTextEntry
              testID="login-password-input"
            />
          )}
        />
      </InputContainer>

      <ForgotPasswordLink
        onPress={() =>
          navigation.navigate('ForgotPasswordScreen')
        }
      >
        Esqueci minha senha
      </ForgotPasswordLink>

      <ButtonContainer>
        <Button
          title="Entrar"
          loading={isLoggingIn}
          disabled={isLoggingIn || form.formState.isSubmitting}
          onPress={submitForm}
          loadingProps={{ testID: 'login-loading' }}
        />
      </ButtonContainer>
    </Container>
  )
}

export default withLoginPresenter(LoginScreen)
