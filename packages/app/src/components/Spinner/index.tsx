import React from 'react'
import { ActivityIndicatorProps } from 'react-native'

import { Container } from './styles'

export interface SpinnerProps extends ActivityIndicatorProps {}

export const Spinner: React.FC<SpinnerProps> = props => {
  return <Container {...props} />
}
