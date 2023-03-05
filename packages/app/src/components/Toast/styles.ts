import styled from 'styled-components/native'

export const Container = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.error};
  flex-direction: row;
  align-items: center;
  padding: 16px;
  padding-top: ${({ theme }) => theme.insets.top + 16}px;
`
export const IconContainer = styled.View``
export const TextContainer = styled.View`
  flex: 1;
`

export const Title = styled.Text`
  color: white;
  font-family: 'Poppins_600SemiBold';
  font-size: 14px;
`
export const Description = styled.Text`
  color: white;
  font-family: 'Poppins_500Medium';
  font-size: 12px;
`
