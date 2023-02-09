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
  onUpdatePicture: () => void
  onTakeAnother: () => void
  onCancel: () => void
}

export const PreviewPictureModal: React.FC<PreviewPictureModalProps> = ({
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
              <UpdatePictureButton onPress={props.onUpdatePicture}>
                Atualizar minha foto
              </UpdatePictureButton>

              <TakeAnotherButton onPress={props.onTakeAnother}>
                Selecionar outra
              </TakeAnotherButton>

              <CancelButton onPress={props.onCancel}>Cancelar</CancelButton>
            </ActionsContainer>
          </InnerContainer>
        </Container>
      )}
    </Modal>
  )
}
