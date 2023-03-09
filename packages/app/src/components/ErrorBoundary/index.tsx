import { Log } from '@/config/logger'
import React from 'react'
import {
  ErrorBoundary as ReactErrorBoundary,
  FallbackProps,
} from 'react-error-boundary'
import { useQueryErrorResetBoundary } from 'react-query'
import * as Sentry from 'sentry-expo'

import {
  Container,
  ErrorImage,
  Title,
  Message,
  ButtonContainer,
  ResetButton,
} from './styles'

const ErrorFallback: React.FC<FallbackProps> = ({
  resetErrorBoundary: reset,
}) => {
  return (
    <Container>
      <ErrorImage />

      <Title>Eita! Ocorreu um erro!</Title>

      <Message>
        Ups! Parece que algo deu errado. Não se preocupe, estamos trabalhando
        para resolver isso o mais rápido possível. {'\n\n'}Por favor, tente
        novamente mais tarde ou entre em contato conosco se precisar de ajuda.
        Obrigado pela sua paciência.
      </Message>

      <ButtonContainer>
        <ResetButton onPress={reset}>Tentar novamente</ResetButton>
      </ButtonContainer>
    </Container>
  )
}

export const ErrorBoundary: React.FC = ({ children }) => {
  const { reset } = useQueryErrorResetBoundary()

  const handleError = (error: Error) => {
    console.log('ERRO', error)
    Sentry.Native.captureException(error)
    Log.error('Error major', { error })
  }

  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={reset}
      onError={(error: Error) => handleError(error)}
    >
      {children}
    </ReactErrorBoundary>
  )
}
