import { Text } from '@rneui/themed'
import styled from 'styled-components/native'

export const Container = styled.View`
  max-width: 300px;
  min-width: 100px;
  padding: 0 16px;
`

export const MessageContainer = styled.View`
  padding: 12px 16px;
  border-radius: 16px;
`

export const SentBy = styled(Text)`
  font-family: 'Quicksand_600SemiBold';
  font-size: 14px;
`

export const Message = styled(Text)`
  font-family: 'Quicksand_500Medium';
  font-size: 12px;
`

export const SentAt = styled(Text)`
  padding-top: 4px;
  padding-right: 8px;
  font-family: 'Quicksand_500Medium';
  font-size: 12px;
  text-align: right;
`

export const ReceivedContainer = styled(Container)`
  align-self: flex-start;
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
`

export const SentMessageContainer = styled(MessageContainer)`
  border-bottom-right-radius: 0;
  background-color: ${({ theme }) => theme.colors.primary};
`

export const SentMessage = styled(Message)`
  color: ${({ theme }) => theme.colors.white};
`
