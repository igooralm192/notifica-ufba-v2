import React from 'react'
import {
  Modal as RNModal,
  Pressable,
  StyleProp,
  ViewStyle,
} from 'react-native'

export interface ModalProps {
  visible: boolean
  onHide?: () => void
  backdropStyle?: StyleProp<ViewStyle>
}

export const Modal: React.FC<ModalProps> = ({
  visible,
  onHide,
  backdropStyle,
  children,
}) => {
  return (
    <RNModal animationType="fade" transparent={true} visible={visible}>
      <Pressable
        style={[
          {
            flex: 1,
            backgroundColor: 'rgba(0,0,0,.5)',
          },
          backdropStyle,
        ]}
        onPress={onHide}
      >
        {children}
      </Pressable>
    </RNModal>
  )
}
