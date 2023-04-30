import { Input } from '@/components/Input'
import { Layout } from '@/components/Layout'
import { Stack } from '@/components/Stack'

import { Icon, Text } from '@rneui/themed'
import styled from 'styled-components/native'

export const Container = styled(Layout)``

export const InputContainer = styled.Pressable`
  margin: 0 24px 16px;
`

export const ExperimentInput = styled(Input).attrs({
  inputContainerStyle: {
    paddingVertical: 4,
    paddingHorizontal: 4,
  },

  labelStyle: {
    paddingVertical: 8,
  },
})``

export const OptionsContainer = styled.View``

export const OptionContainer = styled(Stack).attrs({ d: 'horizontal' })`
  margin: 0 24px;
  width: 100%;
  align-items: center;
`

export const OptionIcon = styled(Icon).attrs({
  containerStyle: {
    backgroundColor: '#E9E9E9',
    padding: 12,
    borderRadius: 12,
  },
})``
export const OptionName = styled(Text)`
  font-family: 'Quicksand_600SemiBold';
  font-size: 16px;
`
