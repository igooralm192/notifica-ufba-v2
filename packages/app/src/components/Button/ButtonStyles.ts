import { Button, ButtonProps } from '@rneui/themed'
import styled from 'styled-components/native'

const outlineStyle = {
  borderWidth: 2,
}

const buttonStyleMap = {
  solid: {},
  outline: outlineStyle,
  clear: {},
}

export const Container = styled(Button).attrs<ButtonProps>(({ type }) => {
  return {
    containerStyle: {
      borderRadius: 32,
    },
    titleStyle: {
      fontFamily: 'Quicksand_700Bold',
      fontSize: 18,
    },
    buttonStyle: {
      padding: 16,
      borderRadius: 32,
      ...(type ? buttonStyleMap[type] : {}),
    },
  }
})``
