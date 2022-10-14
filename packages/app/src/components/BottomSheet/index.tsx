import { Modal, ModalProps } from '@/components/Modal'
import React from 'react'
import { InnerContainer, Content } from './styles'

export interface BottomSheetProps extends ModalProps {}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  onHide,
  children,
}) => {
  return (
    <Modal
      visible={visible}
      onHide={onHide}
      backdropStyle={{ flexDirection: 'column-reverse' }}
    >
      <InnerContainer>
        <Content>{children}</Content>
      </InnerContainer>
    </Modal>
  )
}
