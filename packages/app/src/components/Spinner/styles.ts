import { ActivityIndicator } from 'react-native'
import styled from 'styled-components/native'

export const Container = styled(ActivityIndicator).attrs(({ theme }) => {
  return {
    color: theme.colors.primary,
    size: 'large',
  }
})``
