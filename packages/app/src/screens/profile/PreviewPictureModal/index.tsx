import { Modal, ModalProps } from '@/components/Modal'
import React from 'react'

import {
  Container,
  InnerContainer,
  TitleContainer,
  Title,
  PreviewImageContainer,
  PreviewImage,
  ActionsContainer,
  UpdatePictureButton,
  TakeAnotherButton,
  CancelButton,
} from './styles'

export interface PreviewPictureModalProps extends ModalProps {
  pictureUri?: string
  loading?: boolean
  onUpdatePicture: () => void
  onTakeAnother: () => void
  onCancel: () => void
}

export const PreviewPictureModal: React.FC<PreviewPictureModalProps> = ({
  loading,
  pictureUri,
  ...props
}) => {
  return (
    <Modal {...props}>
      {!!pictureUri && (
        <Container>
          <InnerContainer>
            <TitleContainer>
              <Title>Visualize sua foto</Title>
            </TitleContainer>

            <PreviewImageContainer>
              <PreviewImage source={{ uri: pictureUri }} resizeMode="cover" />
            </PreviewImageContainer>

            <ActionsContainer s={4}>
              <UpdatePictureButton
                onPress={props.onUpdatePicture}
                loading={loading}
                disabled={loading}
              >
                Atualizar minha foto
              </UpdatePictureButton>

              <TakeAnotherButton
                onPress={props.onTakeAnother}
                disabled={loading}
              >
                Selecionar outra
              </TakeAnotherButton>

              <CancelButton onPress={props.onCancel} disabled={loading}>
                Cancelar
              </CancelButton>
            </ActionsContainer>
          </InnerContainer>
        </Container>
      )}
    </Modal>
  )
}
