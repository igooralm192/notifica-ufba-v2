import { InputProps as RNEInputProps } from '@rneui/themed'
import React from 'react'
import { TextInput } from 'react-native'

import { Container } from './InputStyles'

export interface InputProps extends Omit<RNEInputProps, 'shake'> {}

const Input: React.ForwardRefRenderFunction<TextInput, InputProps> = (
  props,
  ref,
) => {
  return <Container {...props} ref={ref} shake={() => console.log('SHAKED')} />
}

export default React.forwardRef(Input)
