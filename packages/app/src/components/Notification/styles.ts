import styled from 'styled-components/native'

export const Container = styled.TouchableOpacity`
  width: 95%;
  margin: 0 16px;
  margin-top: ${({ theme }) => theme.insets.top + 4}px;
  padding: 16px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 1px 1px 1px rgba(0,0,0,0.1);
`

export const Title = styled.Text`
  color: ${({theme}) => theme.colors.black};
  font-family: 'Quicksand_700Bold';
  font-size: 16px;
`
export const Description = styled.Text`
  color: ${({ theme }) => theme.colors.black};
  font-family: 'Poppins_400Regular';
  font-size: 12px;
`
