import { Modal, ModalProps } from '@/components/Modal'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Container, SwipeLabel, InnerContainer } from './styles'

export interface BottomSheetProps extends ModalProps {}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  children,
  ...props
}) => {
  const insets = useSafeAreaInsets()

  return (
    <Modal
      {...props}
      backdropStyle={{ justifyContent: 'flex-end' }}
    >
      <Container>
        <SwipeLabel />

        <InnerContainer style={{ paddingBottom: insets.bottom }}>
          {children}
        </InnerContainer>
      </Container>
    </Modal>
  )
}
