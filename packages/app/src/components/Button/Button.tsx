import { ButtonProps as RNEButtonProps } from '@rneui/themed'
import React from 'react'

import { Container } from './ButtonStyles'

export interface ButtonProps extends RNEButtonProps {}

const Button: React.FC<ButtonProps> = props => {
  return <Container {...props} />
}

export default Button
