import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styled from 'styled-components/native'

export const Container = styled(KeyboardAwareScrollView).attrs({
  contentContainerStyle: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
})``
