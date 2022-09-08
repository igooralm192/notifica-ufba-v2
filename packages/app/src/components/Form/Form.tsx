import React from 'react'
import { Keyboard } from 'react-native'

import { Container } from './FormStyles'

export interface FormProps {}

const Form: React.FC<FormProps> = ({ children }) => {
  return (
    <Container
      enableOnAndroid={true}
      enableResetScrollToCoords={false}
      contentInsetAdjustmentBehavior="always"
      overScrollMode="always"
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
      onScrollBeginDrag={Keyboard.dismiss}
    >
      {children}
    </Container>
  )
}

export default Form
