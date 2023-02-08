import { Modal, ModalProps } from '@/components/Modal'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { InnerContainer, Content } from './styles'

export interface BottomSheetProps extends ModalProps {}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  onHide,
  children,
}) => {
  const insets = useSafeAreaInsets()

  return (
    <Modal
      visible={visible}
      onHide={onHide}
      backdropStyle={{ flexDirection: 'column-reverse' }}
    >
      <InnerContainer style={{ paddingBottom: insets.bottom }}>
        <Content>{children}</Content>
      </InnerContainer>
    </Modal>
  )
}
