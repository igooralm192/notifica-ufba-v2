import React from 'react'
import { Keyboard, StyleProp, ViewStyle } from 'react-native'
import { KeyboardAwareScrollViewProps } from 'react-native-keyboard-aware-scroll-view'

import { Container } from './FormStyles'

export interface FormProps extends KeyboardAwareScrollViewProps {}

const Form: React.FC<FormProps> = props => {
  return (
    <Container
      enableOnAndroid={true}
      enableResetScrollToCoords={false}
      contentInsetAdjustmentBehavior="always"
      overScrollMode="always"
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
      onScrollBeginDrag={Keyboard.dismiss}
      {...props}
    />
  )
}

export default Form
