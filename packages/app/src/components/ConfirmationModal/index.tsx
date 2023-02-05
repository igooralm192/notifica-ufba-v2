import { Modal, ModalProps } from '@/components/Modal'
import { Spacer } from '@/components/Spacer'

import React from 'react'
import { Pressable } from 'react-native'

import {
  Container,
  TitleContainer,
  Title,
  BodyContainer,
  Body,
  ActionsContainer,
  YesButton,
  NoButton,
} from './styles'

export interface ConfirmationModalProps extends ModalProps {
  title: string
  body: string
  onConfirm: () => void
  onBack: () => void
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  title,
  body,
  onConfirm,
  onBack,
  ...props
}) => {
  return (
    <Modal {...props}>
      <Pressable
        onPress={onBack}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Container>
          <TitleContainer>
            <Title>{title}</Title>
          </TitleContainer>

          <BodyContainer>
            <Body>{body}</Body>
          </BodyContainer>

          <ActionsContainer>
            <NoButton title="Não" color="grey1" onPress={onBack} />
            <Spacer d="horizontal" s={4} />
            <YesButton title="Sim" color="error" onPress={onConfirm} />
          </ActionsContainer>
        </Container>
      </Pressable>
    </Modal>
  )
}
