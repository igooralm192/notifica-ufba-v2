import {Button,  Text } from '@rneui/themed'
import styled from 'styled-components/native'

export const Container = styled.View`
  width: 250px;
  background-color: white;
  border-radius: 16px;
  padding: 8px 0;
`

export const CommonContainer = styled.View`
  padding: 8px 16px;
`

export const TitleContainer = styled(CommonContainer)`
  
`

export const Title = styled(Text)`
  color: ${({ theme }) => theme.colors.black};
  font-family: 'Poppins_600SemiBold';
  font-size: 16px;
  margin-top: -4px;
  margin-bottom: -4px;
`

export const BodyContainer = styled(CommonContainer)`
  padding: 16px;
  border: 0px solid ${({ theme }) => theme.colors.grey2};
  border-top-width: 1px;
`

export const Body = styled(Text)`
  color: ${({ theme }) => theme.colors.black};
  font-family: 'Inter_400Regular';
  font-size: 12px;
`

export const ActionsContainer = styled(CommonContainer)`
  flex-direction: row;
  justify-content: flex-end;
  border: 0px solid ${({ theme }) => theme.colors.grey2};
  border-top-width: 1px;
`

export const ActionButton = styled(Button).attrs(() => {
  return {
    titleStyle: {
      fontSize: 12,
      fontFamily: 'Inter_600SemiBold',
    },
    buttonStyle: {
      borderRadius: 4,
      padding: 6,
      paddingHorizontal: 16
    },
  }
})``

export const YesButton = styled(ActionButton)``
export const NoButton = styled(ActionButton)``
