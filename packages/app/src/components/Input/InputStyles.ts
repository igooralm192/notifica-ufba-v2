import styled from 'styled-components/native'
import { Input, InputProps } from '@rneui/themed'

export const Container = styled(Input).attrs<InputProps>(
  ({ theme, leftIcon, inputContainerStyle, renderErrorMessage, ...props }) => {
    return {
      ...props,
      containerStyle: {
        paddingHorizontal: 0,
        ...(props.containerStyle?.valueOf() as any),
      },
      inputContainerStyle: {
        width: '100%',
        // minHeight: 56,
        paddingHorizontal: 16,
        backgroundColor: theme.colors.grey0,
        borderWidth: 1,
        borderColor: theme.colors.grey1,
        borderStyle: 'solid',
        borderRadius: 8,
        ...(inputContainerStyle?.valueOf() as any),
      },
      leftIcon: leftIcon
        ? {
            color: renderErrorMessage ? 'red' : theme.colors.grey5,
            ...(leftIcon.valueOf() as any),
          }
        : undefined,
    }
  },
)`
  padding: 0 8px;
  font-family: 'Quicksand_500Medium';
  font-size: 16px;
`
