import { Input, InputProps } from '@/components/Input'
import React from 'react'
import { TextInput } from 'react-native'

export interface NumericInputProps extends InputProps {}

const NumericInput: React.ForwardRefRenderFunction<
  TextInput,
  NumericInputProps
> = (props, ref) => {
  const handleChangeText = (text: string) => {
    const newText = text.replace(/[^\d]/g, '')
    return props.onChangeText?.(newText)
  }

  return (
    <Input
        {...props}
        ref={ref}
        keyboardType="numeric"
        onChangeText={handleChangeText}
      />
  )
}

export default React.forwardRef(NumericInput)
