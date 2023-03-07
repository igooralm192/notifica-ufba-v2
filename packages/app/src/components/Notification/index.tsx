import { Spacer } from '@/components/Spacer'
import React from 'react'

import { Container, Title, Description } from './styles'

export interface NotificationProps {
  title: string
  description: string
}

export const Notification: React.FC<NotificationProps> = ({
  title,
  description,
}) => {
  return (
    <Container style={{elevation: 4}}>
      <Title>{title}</Title>
      <Spacer s={2}/>
      <Description>{description}</Description>
    </Container>
  )
}
