import styled from 'styled-components/native'

export const Container = styled.View`
  min-height: 50px;
  background-color: white;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
`

export const SwipeLabel = styled.View`
  width: 60px;
  height: 6px;
  background-color: ${({ theme }) => theme.colors.grey2};
  border-radius: 16px;
  align-self: center;
  margin: 6px 0 16px;
`


export const InnerContainer = styled.View`
  padding: 0 16px;
`
