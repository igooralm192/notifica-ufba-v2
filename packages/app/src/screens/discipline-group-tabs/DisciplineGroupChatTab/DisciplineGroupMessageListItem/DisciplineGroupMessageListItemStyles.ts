import { Text } from '@rneui/themed'
import styled from 'styled-components/native'

export const Container = styled.View`
  max-width: 300px;
  padding: 0 16px;
`

export const MessageContainer = styled.View`
  padding: 10px 16px;
  border-radius: 16px;
  min-width: 50px;
`

export const SentBy = styled(Text)`
  font-family: 'Montserrat_700Bold';
  font-size: 12px;
`

export const Message = styled(Text)`
  font-family: 'Montserrat_500Medium';
  font-size: 14px;
`

export const SentAt = styled(Text)`
  padding-top: 4px;
  padding-right: 8px;
  font-family: 'Quicksand_500Medium';
  font-size: 12px;
  text-align: right;
`

export const ReceivedContainer = styled(Container)`
  padding: 0 4px;
  align-self: flex-start;
  align-items: flex-start;
`

export const ReceivedMessageContainer = styled(MessageContainer)`
  border-bottom-left-radius: 0;
  background-color: ${({ theme }) => theme.colors.grey1};
`

export const ReceivedSentBy = styled(SentBy)`
  color: ${({ theme }) => theme.colors.black};
`

export const ReceivedMessage = styled(Message)`
  color: ${({ theme }) => theme.colors.black};
`

export const SentContainer = styled(Container)`
  align-self: flex-end;
  align-items: flex-end;
`

export const SentMessageContainer = styled(MessageContainer)`
  border-bottom-right-radius: 0;
  background-color: ${({ theme }) => theme.colors.primary};
`

export const SentMessage = styled(Message)`
  color: ${({ theme }) => theme.colors.white};
`
