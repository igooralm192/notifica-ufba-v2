import { InputProps } from '@/components/Input'

import React from 'react'
import { TextInput } from 'react-native'
import { useMaskedInputProps } from 'react-native-mask-input'

import { CreateGroupInput } from './CreateGroupStyles'

export const GroupCodeInput = React.forwardRef<TextInput, InputProps>(
  (props, ref) => {
    const maskedInputProps = useMaskedInputProps({
      value: props.value,
      onChangeText: props.onChangeText,
      mask: ['T', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
    })

    return (
      <CreateGroupInput
        {...maskedInputProps}
        ref={ref}
        style={props.style}
        onBlur={props.onBlur}
        errorMessage={props.errorMessage}
        renderErrorMessage={props.renderErrorMessage}
        label="Código"
        placeholder="Digite o código da turma"
        autoCapitalize="none"
        keyboardType="numeric"
        testID="create-group-code-input"
      />
    )
  },
)

// export const SemesterInput = React.forwardRef<TextInput, InputProps>(
//   (props, ref) => {
//     const maskedInputProps = useMaskedInputProps({
//       value: props.value,
//       onChangeText: props.onChangeText,
//       mask: [/\d/, /\d/, /\d/, /\d/, '.', /[1-2]/],
//     })

//     return (
//       <CreateGroupInput
//         {...maskedInputProps}
//         ref={ref}
//         style={props.style}
//         onBlur={props.onBlur}
//         errorMessage={props.errorMessage}
//         renderErrorMessage={props.renderErrorMessage}
//         label="Semestre"
//         placeholder="Digite o semestre da turma"
//         autoCapitalize="none"
//         keyboardType="numeric"
//         testID="create-group-code-input"
//       />
//     )
//   },
// )
