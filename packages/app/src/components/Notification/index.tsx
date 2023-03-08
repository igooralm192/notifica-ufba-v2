import { Spacer } from '@/components/Spacer'
import React from 'react'

import { Container, Title, Description } from './styles'

export interface NotificationProps {
  title: string
  description: string
  onPress?: () => void
}

export const Notification: React.FC<NotificationProps> = ({
  title,
  description,
  onPress
}) => {
  return (
    <Container activeOpacity={0.9} onPress={onPress}>
      <Title>{title}</Title>
      <Spacer s={2}/>
      <Description>{description}</Description>
    </Container>
  )
}
