import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import RNModal from 'react-native-modal'

export interface ModalProps {
  visible: boolean
  onHide?: () => void
  onFinishHide?: () => void
  backdropStyle?: StyleProp<ViewStyle>
}

export const Modal: React.FC<ModalProps> = ({
  visible,
  onHide,
  onFinishHide,
  backdropStyle,
  children,
}) => {
  return (
    <RNModal
      style={[{ margin: 0 }, backdropStyle]}
      isVisible={visible}
      swipeDirection={['down']}
      onSwipeComplete={onHide}
      onBackdropPress={onHide}
      onBackButtonPress={onHide}
      onModalHide={onFinishHide}
    >
      {children}
    </RNModal>
  )
}
