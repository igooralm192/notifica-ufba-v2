import { ActivityIndicator } from 'react-native'
import styled from 'styled-components/native'

export const Container = styled(ActivityIndicator).attrs(
  ({ theme, color, size }) => {
    return {
      color: color || theme.colors.primary,
      size: size || 'large',
    }
  },
)``
