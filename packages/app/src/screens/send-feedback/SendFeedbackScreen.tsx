import { Spacer } from '@/components/Spacer'
import { useStatusBar } from '@/contexts/status-bar'

import { joiResolver } from '@hookform/resolvers/joi'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Keyboard } from 'react-native'

import {
  useSendFeedbackPresenter,
  withSendFeedbackPresenter,
} from './SendFeedbackPresenter'
import {
  Container,
  ScrollContainer,
  FeedbackLabel,
  InputContainer,
  SendFeedbackInput,
  ButtonContainer,
  SendFeedbackButton,
} from './SendFeedbackStyles'
import { sendFeedbackSchema } from './schemas'

export interface ISendFeedbackFormValues {
  feedback: string
}

const SendFeedbackScreen: React.FC = () => {
  const { sending, sendFeedback } = useSendFeedbackPresenter()

  const form = useForm<ISendFeedbackFormValues>({
    mode: 'onSubmit',
    resolver: joiResolver(sendFeedbackSchema),
  })

  useStatusBar('primary')

  const handleSubmit = async ({ feedback }: ISendFeedbackFormValues) => {
    try {
      Keyboard.dismiss()

      await sendFeedback(feedback)
    } catch (error) {}
  }

  const submitForm = form.handleSubmit(handleSubmit)

  return (
    <Container
      headerProps={{
        title: 'Enviar feedback',
        titleAlign: 'flex-start',
      }}
    >
      <ScrollContainer>
        <FeedbackLabel>
          Queremos ouvir a sua opinião. Envie sugestões, possíveis melhorias,
          bugs ou erros que estejam atrapalhando sua experiência.
        </FeedbackLabel>

        <Spacer s={12} />

        <InputContainer>
          <Controller
            name="feedback"
            control={form.control}
            render={({ field, fieldState }) => (
              <SendFeedbackInput
                placeholder="Digite o que você quer compartilhar conosco"
                value={field.value}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                errorMessage={fieldState.error?.message}
                renderErrorMessage={!!fieldState.error}
                autoCapitalize="sentences"
                multiline
                textAlignVertical="top"
                inputStyle={{minHeight: 200}}
                testID="send-feedback-input"
              />
            )}
          />
        </InputContainer>
      </ScrollContainer>

      <ButtonContainer>
        <SendFeedbackButton
          title="Enviar"
          loading={sending || form.formState.isSubmitting}
          disabled={sending}
          onPress={submitForm}
        />
      </ButtonContainer>
    </Container>
  )
}

export default withSendFeedbackPresenter(SendFeedbackScreen)
