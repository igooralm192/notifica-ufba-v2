import React from 'react'
import { Pressable } from 'react-native'
import { Container, InnerContainer, Content } from './styles'

export interface BottomSheetProps {
  visible: boolean
  onHide: () => void
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  onHide,
  children,
}) => {
  return (
    <Container animationType="fade" transparent={true} visible={visible}>
      <Pressable
        style={{
          backgroundColor: 'rgba(0,0,0,.5)',
          flex: 1,
          flexDirection: 'column-reverse',
          overflow: 'visible',
        }}
        onPress={onHide}
      >
        <InnerContainer>
          <Content>{children}</Content>
        </InnerContainer>
      </Pressable>
    </Container>
  )
}
